import { Injectable, Module, Inject } from '@nestjs/common';
import { AppConfigModule } from '../../common/config/app.config.module';
import { LoggerModule } from '../../common/logger/logger.module';
import { CoreRepository } from './core.repository';
import {
  TypeOrmOptionsFactory,
  TypeOrmModuleOptions,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DatabaseConfig } from '../../common/config/models/database.config';

import { User } from '../../entities/user';
import { ComponentTemplate } from '../../entities/componentTemplate';
import { NodeParam } from '../../entities/nodeParam';
import { Page } from '../../entities/page';
import { PageMeta } from '../../entities/pageMeta';
import { GlobalKey } from '../../entities/globalKey';
import { PageNode } from '../../entities/pageNode';
import { Setting } from '../../entities/setting';
import { crudModules } from '../../sections-config';
import { Component } from '../../entities/component';
import { TypeormLoggerAdapter } from '../../common/logger/typeorm-logger-adapter';
import { MenuEntity } from '../../entities/menu';
import { CrudEntity } from '../../entities/crudEntity';
import { File } from '../../entities/file';
import { CityEntity } from '../../entities/city';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(DatabaseConfig)
  private readonly config: DatabaseConfig;

  @Inject(TypeormLoggerAdapter)
  private readonly typeormLogger: TypeormLoggerAdapter;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'typeorm_connection',
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
    };
  }
}

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: [AppConfigModule, LoggerModule],
      inject: [DatabaseConfig, TypeormLoggerAdapter],
    }),
  ],
  providers: [CoreRepository],
  exports: [CoreRepository],
})
export class RepositoryModule {}
