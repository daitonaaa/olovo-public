import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  EntityManager,
  getManager,
} from 'typeorm';
import { DatabaseConfig } from '../../common/config/models/database.config';
import { TypeormLoggerAdapter } from '../../common/logger/typeorm-logger-adapter';
import { User } from '../../entities/user';
import { Component } from '../../entities/component';
import { ComponentTemplate } from '../../entities/componentTemplate';
import { NodeParam } from '../../entities/nodeParam';
import { Page } from '../../entities/page';
import { PageMeta } from '../../entities/pageMeta';
import { PageNode } from '../../entities/pageNode';
import { GlobalKey } from 'src/entities/globalKey';
import { Setting } from '../../entities/setting';
import { crudModules } from '../../sections-config';
import { MenuEntity } from '../../entities/menu';
import { CrudEntity } from '../../entities/crudEntity';
import { File } from '../../entities/file';
import { CityEntity } from '../../entities/city';

// todo move other place
@Injectable()
export class CoreRepository implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;

  constructor(
    private readonly config: DatabaseConfig,
    private readonly typeormLogger: TypeormLoggerAdapter,
  ) {}

  async onModuleInit(): Promise<void> {
    this.connection = await createConnection({
      name: 'platform',
      type: this.config.type,
      extra: {
        max: this.config.maxConnections,
      },
      replication: {
        master: {
          host: this.config.host,
          port: this.config.port,
          username: this.config.userName,
          password: this.config.password,
          database: this.config.base,
        },
        slaves: [],
      },
      entities: [
        User,
        ComponentTemplate,
        Component,
        NodeParam,
        Page,
        PageMeta,
        PageNode,
        GlobalKey,
        Setting,
        MenuEntity,
        CrudEntity,
        File,
        CityEntity,
        ...crudModules.map((exm) => exm.entity),
      ],
      synchronize: false,
      logger: this.config.logging ? this.typeormLogger : null,
    } as ConnectionOptions);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  getEntityManager(): EntityManager {
    return getManager(this.connection.name);
  }
}
