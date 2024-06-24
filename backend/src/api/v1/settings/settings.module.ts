import { Module } from '@nestjs/common';
import { RepositoryModule } from '../../../database/repositories/repository.module';
import { SettingsController } from './settings.controller';
import { AppConfigModule } from '../../../common/config/app.config.module';

@Module({
  imports: [RepositoryModule, AppConfigModule],
  providers: [],
  controllers: [SettingsController],
})
export class SettingsModule {}
