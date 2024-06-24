import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from '../../../entities/component';
import { ComponentService } from './component.service';

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  providers: [ComponentService],
  controllers: [ComponentController],
  exports: [ComponentService],
})
export class ComponentModule {}
