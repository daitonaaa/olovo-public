import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CoreRepository } from 'src/database/repositories/core.repository';
import { GlobalKey } from 'src/entities/globalKey';
import { Page } from 'src/entities/page';
import { RequestDelete } from '../page/dto/pageRequest';
import { AddPageToKeyRequest } from './dto/addPageToKey';
import { GlobalKeyRequest } from './dto/globalKeyRequest';
import { EnableAuth } from '../../../common/auth/auth.decorators';

@Controller()
@ApiTags('PageKey')
export class PageKeyController {
  constructor(private readonly repository: CoreRepository) {}
  @Get()
  @EnableAuth({ admin: true })
  All() {
    return this.repository
      .getEntityManager()
      .getRepository(GlobalKey)
      .find({
        where: { deletedAt: null },
        relations: ['pages'],
      });
  }

  @Post()
  @ApiBody({ type: GlobalKeyRequest })
  @EnableAuth({ admin: true })
  async create(@Body() pageRequest: GlobalKeyRequest) {
    const existKey = await this.repository
      .getEntityManager()
      .findOne(GlobalKey, { key: pageRequest.key });
    if (existKey) throw new BadRequestException('такой ключ уже есть');

    const newKey = new GlobalKey();
    newKey.key = pageRequest.key;
    newKey.value = pageRequest.value;

    await this.repository.getEntityManager().save(newKey);
  }

  @Post('page')
  @ApiBody({ type: AddPageToKeyRequest })
  @EnableAuth({ admin: true })
  async addPage(@Body() request: AddPageToKeyRequest) {
    const existKey = await this.repository
      .getEntityManager()
      .getRepository(GlobalKey)
      .findOne({
        where: { key: request.key, deletedAt: null },
        relations: ['pages'],
      });

    const existPage = await this.repository
      .getEntityManager()
      .getRepository(Page)
      .findOne({
        where: { id: request.pageId },
      });

    if (!existPage) throw new NotFoundException('страница не найдена');
    if (!existKey) throw new NotFoundException('ключ не найден');

    if (existKey.pages.length > 0) existKey.pages.push(existPage);
    else existKey.pages = [existPage];
    existKey.pages = existKey.pages.filter(
      (x) => x.id !== request.pageIdForDelete,
    );

    await this.repository.getEntityManager().save(existKey);
  }

  @Delete()
  @ApiBody({ type: RequestDelete })
  @EnableAuth({ admin: true })
  async deletePage(@Body() pageRequest: RequestDelete) {
    const exist = await this.repository
      .getEntityManager()
      .getRepository(GlobalKey)
      .findOne({
        where: { id: pageRequest.id },
        relations: ['pages'],
      });

    if (!exist) throw new NotFoundException('ключ не найден');
    exist.pages = [];
    exist.deletedAt = new Date();
    await this.repository.getEntityManager().save(exist);
    await this.repository.getEntityManager().remove(exist);
  }
}
