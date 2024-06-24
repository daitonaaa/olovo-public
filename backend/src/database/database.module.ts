import { Module } from '@nestjs/common';
import { AppConfigModule } from '../common/config/app.config.module';
import { LoggerModule } from '../common/logger/logger.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [AppConfigModule, LoggerModule],
  providers: [DatabaseService],
})
export class DatabaseModule {}
