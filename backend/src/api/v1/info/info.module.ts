import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { AppConfigModule } from '../../../common/config/app.config.module';

@Module({
  imports: [AppConfigModule],
  controllers: [InfoController],
})
export class InfoModule {}
