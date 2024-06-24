import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../../../entities/file';
import { ImagesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [FilesController],
})
export class FilesModule {}
