import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { EnableAuth } from '../../../common/auth/auth.decorators';
import { imagesWithCompressMulterOptions } from '../../../common/files/multer-options';
import { CreateFileRequestDto } from './request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../../../entities/file';
import { Repository } from 'typeorm';
import { CustomFileResult } from '../../../common/files/types';
import { ImagesService } from './files.service';

@Controller()
@ApiTags('Files')
export class FilesController {
  @InjectRepository(File) file_repo: Repository<File>;

  constructor(private readonly image_service: ImagesService) {}

  @Post('/v1/files/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        subjectEntityName: {
          type: 'string',
        },
        subjectField: {
          type: 'string',
        },
        subjectId: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @EnableAuth({ admin: true })
  @UseInterceptors(FileInterceptor('file', imagesWithCompressMulterOptions))
  async uploadFile(
    @UploadedFile() file: CustomFileResult,
    @Body() body: CreateFileRequestDto,
  ): Promise<File> {
    return this.image_service.create(file, {
      id: body.subjectId,
      field: body.subjectField,
      name: body.subjectEntityName,
    });
  }

  @Delete('/v1/files/upload/:id')
  async deleteFile(@Param() params: { id: number }): Promise<void> {
    await this.image_service.deleteByIds([Number(params.id)]);
  }
}
