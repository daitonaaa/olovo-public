import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CoreRepository } from 'src/database/repositories/core.repository';
import { Page } from 'src/entities/page';
import { PageRequest, RequestDelete } from './dto/pageRequest';
import { PageNode } from 'src/entities/pageNode';
import { NodeParam } from 'src/entities/nodeParam';
import { SitemapService } from './services/sitemap.service';
import { GlobalKey } from 'src/entities/globalKey';
import { EnableAuth } from '../../../common/auth/auth.decorators';
import { GetPageByUrlDto } from './dto/getPageByUrl.dto';
import { PageService } from './page.service';
import { PageMeta } from '../../../entities/pageMeta';
import { RobotsService } from './services/robots.service';

@Controller()
@ApiTags('Page')
export class PageController {
  constructor(
    private readonly repository: CoreRepository,
    private readonly sitemapService: SitemapService,
    private readonly pageService: PageService,
    private readonly robotsService: RobotsService,
  ) {}

  @Get('sitemap')
  async sitemap(@Res() res) {
    const buffer = await this.sitemapService.get_xml_buffer();
    res.set('Content-Type', 'application/xml');
    res.set('Content-Length', buffer.length.toString());
    res.end(buffer);
  }

  @Get('robots')
  async robots(@Res() res) {
    res.set('Content-Type', 'text/plain');
    res.end(this.robotsService.get_txt());
  }

  @Get('list')
  @ApiResponse({ type: [Page] })
  async list() {
    const publishedPages = await this.repository
      .getEntityManager()
      .getRepository(Page)
      .find({
        where: { isPublished: true, deletedAt: null },
      });

    return publishedPages;
  }

  @Post('get_by_link')
  @ApiResponse({ type: [Page] })
  @ApiBody({ type: GetPageByUrlDto })
  async findByUri(@Body() { url }: GetPageByUrlDto) {
    let existPage = await this.repository
      .getEntityManager()
      .getRepository(Page)
      .findOne({
        where: { url, deletedAt: null },
        relations: [
          'pageNode',
          'pageNode.nodeParam',
          'pageNode.component',
          'pageMeta',
        ],
      });

    if (!existPage) {
      existPage = await this.pageService.getCrudSingePageByUrl(url);
    }

    if (!existPage) throw new NotFoundException('страница не найдена');

    const allKeys = await this.repository
      .getEntityManager()
      .getRepository(GlobalKey)
      .find({
        where: { deletedAt: null },
        relations: ['pages'],
      });

    const pageKeys = allKeys
      .map((x) => {
        return x.pages.find((x) => x.id == existPage.id) ? x : null;
      })
      .filter((x) => !!x);
    existPage.pageKey = [...pageKeys];
    return existPage;
  }

  @Get()
  @EnableAuth({ admin: true })
  all() {
    return this.repository
      .getEntityManager()
      .getRepository(Page)
      .find({
        where: { deletedAt: null },
        relations: ['pageNode', 'pageNode.nodeParam'],
      });
  }

  @Get(':id')
  @ApiResponse({ type: [Page] })
  @EnableAuth({ admin: true })
  async findOne(@Param('id') id: number) {
    const existPage = await this.repository
      .getEntityManager()
      .getRepository(Page)
      .findOne({
        where: { id: id },
        relations: [
          'pageNode',
          'pageNode.nodeParam',
          'pageNode.component',
          'pageMeta',
        ],
      });

    if (!existPage) throw new NotFoundException('страница не найдена');
    return existPage;
  }

  @Delete()
  @ApiBody({ type: RequestDelete })
  @EnableAuth({ admin: true })
  async deletePage(@Body() pageRequest: RequestDelete) {
    const existPage = await this.repository
      .getEntityManager()
      .findOne(Page, { id: pageRequest.id });

    if (existPage) {
      await this.repository.getEntityManager().transaction(async (tem) => {
        await tem.delete(NodeParam, { page: existPage });
        await tem.delete(PageNode, { page: existPage });
        await tem.delete(PageMeta, { page: existPage });
        await tem.delete(Page, { id: existPage.id });
      });
    }
  }

  @Delete('node')
  @ApiBody({ type: RequestDelete })
  @EnableAuth({ admin: true })
  async deletePageNode(@Body() pageRequest: RequestDelete) {
    await this.repository.getEntityManager().transaction(async (tem) => {
      await tem.delete(NodeParam, { pageNodeId: pageRequest.id });
      await tem.delete(PageNode, { id: pageRequest.id });
    });
  }

  @Post()
  @ApiBody({ type: PageRequest })
  @EnableAuth({ admin: true })
  async create(@Body() pageRequest: PageRequest) {
    if (!pageRequest.id) {
      await this.pageService.createPage(pageRequest);
    } else {
      await this.pageService.updatePage(pageRequest);
    }
  }
}
