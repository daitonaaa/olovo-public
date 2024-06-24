import { Module } from '@nestjs/common';
import { RepositoryModule } from '../../../database/repositories/repository.module';

import { PageController } from './page.controller';
import { SitemapService } from './services/sitemap.service';
import { LoggerModule } from '../../../common/logger/logger.module';
import { PageService } from './page.service';
import { AppConfigModule } from '../../../common/config/app.config.module';
import { RobotsService } from './services/robots.service';

@Module({
  imports: [RepositoryModule, LoggerModule, AppConfigModule],
  providers: [SitemapService, PageService, RobotsService],
  exports: [PageService],
  controllers: [PageController],
})
export class PageModule {}
