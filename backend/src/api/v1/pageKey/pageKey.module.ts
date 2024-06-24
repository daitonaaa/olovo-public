import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { RepositoryModule } from 'src/database/repositories/repository.module';
import { PageKeyController } from './pageKey.controller';

@Module({
  imports: [RepositoryModule, LoggerModule],
  controllers: [PageKeyController],
})
export class PageKeyModule {}
