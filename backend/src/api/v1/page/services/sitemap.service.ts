import { Injectable } from '@nestjs/common';
import { CoreRepository } from '../../../../database/repositories/core.repository';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Page } from '../../../../entities/page';
import { AppLogger } from '../../../../common/logger/app-logger';
import { AppConfig } from '../../../../common/config/models/app.config';
import { crudModules } from '../../../../sections-config';
import { EntityBase } from '../../../../base_entities/EntityBase';

const get_page_lastmod = <E extends EntityBase>(entity_intance: E): string => {
  const date = entity_intance.updatedAt || entity_intance.dateCreated;
  return date.toISOString();
};

@Injectable()
export class SitemapService {
  constructor(
    private readonly repository: CoreRepository,
    private readonly logger: AppLogger,
    private readonly appConfig: AppConfig,
  ) {
    this.logger.setContext('SitemapService');
  }

  async get_xml_buffer(): Promise<Buffer> {
    this.logger.log('Start generate sitemap');
    const pages = await this.repository
      .getEntityManager()
      .getRepository(Page)
      .find({
        where: {
          deletedAt: null,
          isPublished: true,
        },
      });

    const stream = new SitemapStream({
      hostname: this.appConfig.clientHostname,
    });

    for (const page of pages) {
      if (page.isCrud) {
        continue;
      }

      stream.write({
        url: page.url,
        lastmod: get_page_lastmod(page),
      });
    }

    // crud integrate
    for (const crud_conf of crudModules) {
      const base_path = `/${crud_conf.path}`;
      const list_page = pages.find((page) => page.url === base_path);
      if (list_page) {
        stream.write({
          url: list_page.url,
          lastmod: get_page_lastmod(list_page),
        });
      }

      const crud_items_db = await this.repository
        .getEntityManager()
        .getRepository(crud_conf.entity)
        .find();
      for (const crud_item of crud_items_db) {
        const slug = crud_item[crud_conf.slug.field];
        stream.write({
          url: `${base_path}/${slug}`,
          lastmod: get_page_lastmod(crud_item),
        });
      }
    }

    stream.end();
    return streamToPromise(stream);
  }
}
