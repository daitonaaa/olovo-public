import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from '../../entities/component';
import { SectionsSyncService } from './sync.service';
import { ComponentService } from '../../api/v1/component/component.service';
import { CrudEntity } from '../../entities/crudEntity';
import { PageModule } from '../../api/v1/page/page.module';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Component, CrudEntity]),
    ComponentService,
    PageModule,
    LoggerModule,
  ],
  providers: [SectionsSyncService, ComponentService],
  exports: [SectionsSyncService],
})
export class SectionsSyncModule {}
