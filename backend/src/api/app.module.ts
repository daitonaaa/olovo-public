import { RouterModule } from 'nest-router/router.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { routes } from './routes';
import { ApiModuleV1 } from './v1/api.module.v1';
import { AppConfigModule } from '../common/config/app.config.module';
import { LoggerModule } from '../common/logger/logger.module';
import { AuthModule } from '../common/auth/auth.module';
import { RepositoryModule } from '../database/repositories/repository.module';
import { AuthService } from '../common/auth/auth.service';
import { SectionsSyncModule } from '../sections-config/sync/sync.module';
import { SectionsSyncService } from '../sections-config/sync/sync.service';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { AppConfig } from '../common/config/models/app.config';
import { UploadModule } from 'src/api/v1/upload/upload.module';
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AuthModule,
    ApiModuleV1,
    AppConfigModule,
    LoggerModule,
    RepositoryModule,
    UploadModule,
    SectionsSyncModule,
    SentryModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (conf: AppConfig) => ({
        dsn: conf.sentry_dsn,
        debug: conf.isLocal,
        environment: conf.environment,
        release: null,
        logLevels: ['debug', 'log', 'warn', 'verbose'],
      }),
      inject: [AppConfig],
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly sectionSyncService: SectionsSyncService,
  ) {}

  async onModuleInit() {
    await this.authService.resolveFirstAdminUserOnAppInit();
    await this.sectionSyncService.syncComponents();
    await this.sectionSyncService.syncCrudEntities();
    await this.sectionSyncService.initFirstMenuIfEmpty();
    await this.sectionSyncService.initCities();
  }
}
