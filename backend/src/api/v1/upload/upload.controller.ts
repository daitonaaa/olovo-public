import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { getRandomFileName } from 'src/common/utils/getRandomFileName';
import { requireNotNull } from 'src/common/utils/requireNotNull';
import { FileSizeInterceptor } from './file-size.interceptor';

const MAX_FILES_COUNT = 30;

@Controller()
@ApiTags('Upload')
export class UploadController {
  @Post('/v1/upload')
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILES_COUNT, {
      storage: diskStorage({
        destination: requireNotNull(process.env['UPLOAD_DIR']),
        filename: (req, file, cb) => {
          cb(null, `${getRandomFileName()}${extname(file.originalname)}`);
        },
      }),
    }),
    FileSizeInterceptor,
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return files.map((file) => ({
      originalname: file.originalname,
      filename: file.filename,
    }));
  }
}
