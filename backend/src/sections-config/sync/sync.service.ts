import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Component } from '../../entities/component';
import { EntityManager, Repository } from 'typeorm';
import { components_seed, crudModules } from '../index';
import { ComponentService } from '../../api/v1/component/component.service';
import { FieldType } from '../../common/types/fieldType';
import { CrudEntity } from '../../entities/crudEntity';
import { PageService } from '../../api/v1/page/page.service';
import { PageMetaType } from '../../entities/pageMeta';
import { MenuEntity } from '../../entities/menu';
import { CityEntity } from '../../entities/city';
import { AppLogger } from '../../common/logger/app-logger';
import * as fs from 'fs';
import * as path from 'path';

const fsPromises = fs.promises;

const fieldsArrToString = (fields: FieldType[]) => {
  return [...fields].sort((a, b) => a - b).join(',');
};

@Injectable()
export class SectionsSyncService {
  @InjectRepository(Component) componentRepository: Repository<Component>;
  @InjectRepository(CrudEntity) crudEntityRepository: Repository<CrudEntity>;

  @InjectEntityManager() entityManager: EntityManager;

  constructor(
    private readonly componentService: ComponentService,
    private readonly pageService: PageService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext('Sync service');
  }

  async initCities() {
    const citiesArr = JSON.parse(
      await fsPromises.readFile(path.join(__dirname, '..', 'cities.json'), {
        encoding: 'utf-8',
      }),
    );

    const repo = this.entityManager.getRepository(CityEntity);
    const dbList = await repo.find();
    for (const cityJson of citiesArr) {
      if (!dbList.find((dbItem) => dbItem.name === cityJson.cityName)) {
        const newItem = new CityEntity();
        newItem.name = cityJson.cityName;
        newItem.lt = Number(cityJson.lt);
        newItem.lg = Number(cityJson.lg);

        this.logger.log(`create new city ${cityJson.cityName}`);
        await repo.save(newItem);
      }
    }
  }

  async initFirstMenuIfEmpty() {
    const repo = this.entityManager.getRepository(MenuEntity);
    if ((await repo.count()) === 0) {
      const menu = new MenuEntity();
      menu.name = 'main';
      menu.label = 'Главная';
      menu.url = '/';
      menu.order = 0;
      await repo.save(menu);
    }
  }

  async syncComponents() {
    for (const seed of components_seed) {
      const fromDB = await this.componentRepository.findOne(
        { name: seed.viewSectionName },
        { relations: ['componentTemplate'] },
      );
      if (!fromDB) {
        await this.componentService.createComponent({
          name: seed.viewSectionName,
          componentTemplate: seed.fields,
          label: seed.label,
        });
        continue;
      }

      const fields =
        fromDB.componentTemplate?.map((t) => t.componentType) || [];
      const hasDifferent =
        fieldsArrToString(seed.fields) !== fieldsArrToString(fields);

      if (hasDifferent) {
        await this.componentService.updateComponent({
          id: fromDB.id,
          label: seed.label,
          componentTemplate: seed.fields,
          name: seed.viewSectionName,
        });
      }
    }
  }

  // TODOS(olenin) cleanup after hide module
  async syncCrudEntities() {
    for (const crud of crudModules) {
      await this.entityManager.transaction(async (tem) => {
        const fromDb = await tem.findOne(CrudEntity, {
          name: crud.name,
        });

        if (!fromDb) {
          const newItem = new CrudEntity();
          newItem.name = crud.name;

          await tem.getRepository(CrudEntity).save(newItem);

          const [shortListComponent, singleComponent] = await Promise.all(
            [
              ['ShortList', 'Список записей'],
              ['Single', 'Полная карточка'],
            ].map(([mode, translate]) =>
              this.componentService.createComponent({
                componentTemplate: [FieldType.Meta, FieldType.Title],
                name: `${crud.name}_${mode}`,
                label: `${crud.label} - ${translate}`,
              }),
            ),
          );

          /**
           * Create list page
           */
          await this.pageService.createPage({
            url: `/${crud.path}`,
            name: `${crud.label} - Страница записей`,
            isPublished: true,
            isCrud: true,
            pageNode: [
              {
                name: shortListComponent.name,
                order: 0,
                componentId: shortListComponent.id,
                nodeParam: [
                  {
                    value: JSON.stringify({ all: true, readonly: true }),
                    componentType: FieldType.Meta,
                  },
                ],
              },
            ],
            pageMeta: [
              {
                role: PageMetaType.Title,
                value: crud.label,
              },
              {
                role: PageMetaType.Description,
                value: crud.label,
              },
            ],
            isRegional: false,
          });

          /**
           * Create single page
           */
          await this.pageService.createPage({
            url: `/${crud.path}/:slug`,
            name: `${crud.label} - Запись`,
            isPublished: true,
            isCrud: true,
            pageNode: [
              {
                name: singleComponent.name,
                order: 0,
                componentId: singleComponent.id,
                nodeParam: [
                  {
                    value: JSON.stringify({ slug: ':slug', readonly: true }),
                    componentType: FieldType.Meta,
                  },
                ],
              },
            ],
            pageMeta: [
              {
                role: PageMetaType.Title,
                value: crud.label,
              },
              {
                role: PageMetaType.Description,
                value: crud.label,
              },
            ],
            isRegional: false,
          });
        }
      });
    }
  }
}
