import { CoreRepository } from '../../../database/repositories/core.repository';
import { EnableAuth } from '../../../common/auth/auth.decorators';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { MenuDto, MenuItemDto, SettingsDto } from './dto/settings.dto';
import { Setting } from '../../../entities/setting';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CrudEntity } from '../../../entities/crudEntity';
import { crudModules } from '../../../sections-config';
import { AppConfig } from '../../../common/config/models/app.config';
import { CityResponse, SettingsResponse } from './dto/settings.respone';
import { MenuEntity } from '../../../entities/menu';
import { IsNull } from 'typeorm';
import { ApiResponse } from '@nestjs/swagger';
import { CityEntity } from '../../../entities/city';
import * as requestIp from 'request-ip';
import { mapCityToResponse } from './mappers';
import axios from 'axios';

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Радиус Земли в км
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Расстояние между точками в км
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

@Controller()
@ApiTags('Settings')
export class SettingsController {
  constructor(
    private readonly repository: CoreRepository,
    private readonly appConfig: AppConfig,
  ) {}

  @Get('city-list')
  @ApiResponse({ type: CityResponse, isArray: true, status: 200 })
  async cities(@Query('q') q: string): Promise<CityResponse[]> {
    const results: CityResponse[] = [];
    const citiesDb = await this.repository
      .getEntityManager()
      .getRepository(CityEntity)
      .find();

    for (const dbItem of citiesDb) {
      if (
        q &&
        typeof q === 'string' &&
        !dbItem.name.toLowerCase().includes(q.toLowerCase())
      ) {
        continue;
      }

      results.push(mapCityToResponse(dbItem));
    }

    return results;
  }

  @Get('detect-city')
  async detectedCity(@Req() req) {
    const clientIp = requestIp.getClientIp(req);
    if (clientIp) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const { data } = await axios.get<any, any>(
          `http://ip-api.com/json/${clientIp}`,
          { signal: controller.signal },
        );
        clearTimeout(timeoutId);

        if (data && data.lat && data.lon) {
          let minDistance = Infinity;
          let closestCity: CityEntity | null = null;

          (
            await this.repository
              .getEntityManager()
              .getRepository(CityEntity)
              .find()
          ).forEach((cityDb) => {
            const distance = getDistance(
              data.lat,
              data.lon,
              cityDb.lt,
              cityDb.lg,
            );
            if (distance < minDistance) {
              minDistance = distance;
              closestCity = cityDb;
            }
          });

          return mapCityToResponse(closestCity);
        }
      } catch (err) {
        console.dir(err);
        // silence
      }
    }

    if (this.appConfig.isLocal) {
      return mapCityToResponse(
        await this.repository
          .getEntityManager()
          .getRepository(CityEntity)
          .findOne(),
      );
    }

    return null;
  }

  @Post('menu')
  @EnableAuth({ admin: true })
  async changeMenu(@Body() body: MenuDto) {
    const applyDtoToEntity = (
      namespaceName: string,
      dto: MenuItemDto,
      entity: MenuEntity,
    ) => {
      entity.name = namespaceName;
      entity.label = dto.label;
      entity.order = dto.order;
      entity.url = dto.url;
    };

    if (body.namespaces) {
      return this.repository.getEntityManager().transaction(async (tem) => {
        await tem
          .getRepository(MenuEntity)
          .createQueryBuilder('menuQb')
          .update()
          .set({ deletedAt: new Date() })
          .execute();

        const newItems: MenuEntity[] = [];
        for (const namespace of body.namespaces) {
          for (const menuItem of namespace.items || []) {
            const menu = new MenuEntity();
            applyDtoToEntity(namespace.name, menuItem, menu);
            menu.children = [];

            if (menuItem.items?.length) {
              for (const submenuItem of menuItem.items) {
                const submenu = new MenuEntity();
                applyDtoToEntity(namespace.name, submenuItem, submenu);
                submenu.parent = menu;
                newItems.push(submenu);
              }
            }

            newItems.push(menu);
          }
        }

        await tem.save<MenuEntity>(newItems);
      });
    }
  }

  @Get('menu')
  async getMenu() {
    const items = await this.repository
      .getEntityManager()
      .getRepository(MenuEntity)
      .find({ where: { deletedAt: IsNull() }, relations: ['parent'] });

    const results = {};
    const parentItems = items.filter((item) => !item.parent);
    parentItems.forEach((item) => {
      const childs = items.filter((db) => db.parent?.id === item.id);
      item.children = childs;

      if (!results[item.name]) {
        results[item.name] = [];
      }

      results[item.name].push(item);
    });

    return results;
  }

  @Get()
  async get(): Promise<SettingsResponse> {
    const settings = await this.repository
      .getEntityManager()
      .getRepository(Setting)
      .findOne({ order: { id: 'DESC' } });

    const crudsDb = await this.repository
      .getEntityManager()
      .getRepository(CrudEntity)
      .find();

    return {
      ...settings,
      uploadStaticPath: this.appConfig.uploadStaticPath,
      cruds: crudModules.filter((c) =>
        crudsDb.find((db) => db.name === c.name),
      ),
    };
  }

  @Post()
  @EnableAuth({ admin: true })
  async push(@Body() settingsRequest: SettingsDto): Promise<Setting> {
    const repo = this.repository.getEntityManager().getRepository(Setting);
    const setting = new Setting();
    setting.head = settingsRequest.head;
    setting.publicEmail = settingsRequest.publicEmail;
    setting.systemEmail = settingsRequest.systemEmail;
    setting.phoneNumber = settingsRequest.phoneNumber;
    setting.siteName = settingsRequest.siteName;
    setting.confidentialityUrl = settingsRequest.confidentialityUrl;
    setting.personalDataUrl = settingsRequest.personalDataUrl;

    await repo.save(setting);
    return setting;
  }
}
