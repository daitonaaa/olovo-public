import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Page } from '../../../entities/page';
import { Component } from '../../../entities/component';
import { PageNode } from '../../../entities/pageNode';
import { NodeParam } from '../../../entities/nodeParam';
import { PageMeta } from '../../../entities/pageMeta';
import { PageMetaRequest } from './dto/pageMetaRequest';
import { PageNoderequest } from './dto/pageNodeRequest';
import { PageRequest } from './dto/pageRequest';
import { NodeParamRequest } from './dto/nodeParamRequest';
import { CoreRepository } from '../../../database/repositories/core.repository';
import { FieldType } from '../../../common/types/fieldType';

@Injectable()
export class PageService {
  constructor(private readonly repository: CoreRepository) {}

  async getCrudSingePageByUrl(url: string): Promise<Page> {
    const [, category, slug] = url.split('/');
    const page = await this.repository
      .getEntityManager()
      .getRepository(Page)
      .findOne({
        where: { url: `/${category}/:slug`, deletedAt: null },
        relations: [
          'pageNode',
          'pageNode.nodeParam',
          'pageNode.component',
          'pageMeta',
        ],
      });

    if (!page) {
      return null;
    }

    // TODOS (check slug exists by crud)

    const singleReg = /__crud_(\w+)_Single/g;
    const crudSingle = page.pageNode.find((node) => singleReg.test(node.name));

    if (crudSingle) {
      const metaNodeParam = crudSingle.nodeParam.find(
        (p) => p.componentType === FieldType.Meta,
      );
      const jsonValue = JSON.parse(metaNodeParam.value);
      jsonValue.slug = slug;
      metaNodeParam.value = JSON.stringify(jsonValue);
      return page;
    }

    return null;
  }

  async createPage(pageRequest: PageRequest) {
    const existPage = await this.repository
      .getEntityManager()
      .findOne(Page, { url: pageRequest.url });
    if (existPage)
      throw new BadRequestException('страница с таким URL уже есть');

    await this.repository.getEntityManager().transaction(async (tem) => {
      const page = new Page();
      this.mapPageData(page, pageRequest);

      await tem.save(page);

      await Promise.all(
        pageRequest.pageNode.map(async (x) => {
          const component = await this.repository
            .getEntityManager()
            .findOne(Component, { id: x.componentId });

          const node = new PageNode();
          this.mapComponent(node, x, component, page);
          await tem.save(node);

          const nodesParam: NodeParam[] = x.nodeParam.map((x) => {
            const nodeParam = new NodeParam();
            this.mapNodeParam(nodeParam, x, node, page);
            return nodeParam;
          });

          await tem.save(nodesParam);
        }),
      );

      await Promise.all(
        pageRequest.pageMeta?.map(async (x) => {
          const pageMeta = new PageMeta();

          this.mapPageMeta(pageMeta, page, x);

          await tem.save(pageMeta);
        }),
      );
    });
  }

  async updatePage(pageRequest: PageRequest) {
    const existPage = await this.repository
      .getEntityManager()
      .findOne(Page, { url: pageRequest.url });

    if (existPage && existPage.id !== pageRequest.id)
      throw new BadRequestException('страница с таким URL уже есть');

    await this.repository.getEntityManager().transaction(async (tem) => {
      const page = await tem.findOne(Page, { id: pageRequest.id });

      if (!page) throw new NotFoundException('страница не найдена');

      this.mapPageData(page, pageRequest);
      page.updatedAt = new Date();

      await tem.save(page);

      await Promise.all(
        pageRequest.pageNode.map(async (x) => {
          const component = await this.repository
            .getEntityManager()
            .findOne(Component, { id: x.componentId });
          const node = x.id
            ? await this.repository
                .getEntityManager()
                .findOne(PageNode, { id: x.id })
            : new PageNode();

          this.mapComponent(node, x, component, page);
          node.updatedAt = new Date();
          await tem.save(node);

          const nodesParam: Awaited<{ id: number }>[] = await Promise.all(
            x.nodeParam.map(async (x) => {
              const nodeParam = x.id
                ? await this.repository
                    .getEntityManager()
                    .findOne(NodeParam, { id: x.id })
                : new NodeParam();

              this.mapNodeParam(nodeParam, x, node, page);
              nodeParam.updatedAt = new Date();
              return nodeParam;
            }),
          );

          await tem.save(nodesParam);
        }),
      );

      await Promise.all(
        pageRequest.pageMeta?.map(async (x) => {
          const pageMeta = x.id
            ? await this.repository
                .getEntityManager()
                .findOne(PageMeta, { id: x.id })
            : new PageMeta();

          pageMeta.updatedAt = new Date();
          this.mapPageMeta(pageMeta, page, x);

          await tem.save(pageMeta);
        }),
      );
    });
  }

  private mapPageMeta(pageMeta: PageMeta, page: Page, x: PageMetaRequest) {
    pageMeta.page = page;
    pageMeta.value = x.value;
    pageMeta.role = x.role;
  }

  private mapComponent(
    node: PageNode,
    x: PageNoderequest,
    component: Component,
    page: Page,
  ) {
    node.name = x.name;
    node.order = x.order;
    node.isWrappedContainer = x.isWrappedContainer;
    node.component = component;
    node.page = page;
  }

  private mapPageData(page: Page, pageRequest: PageRequest) {
    page.name = pageRequest.name;
    page.url = pageRequest.url;
    page.isPublished = pageRequest.isPublished;
    page.isRegional = pageRequest.isRegional;
    page.isCrud = pageRequest.isCrud;
  }

  private mapNodeParam(
    nodeParam: NodeParam,
    x: NodeParamRequest,
    node: PageNode,
    page: Page,
  ) {
    nodeParam.value = x.value;
    nodeParam.componentType = x.componentType;
    nodeParam.pageNode = node;
    nodeParam.page = page;
  }
}
