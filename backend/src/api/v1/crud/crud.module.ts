/*
        Auto generated code /src/scripts/crud-template
    */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([]), FilesModule],
  providers: [],
  exports: [],
  controllers: [],
})
export class CrudModule {}
