import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const MAX_TOTAL_SIZE_MB = 80 * 1024 * 1024; // 80 MB in bytes

@Injectable()
export class FileSizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const files: Array<Express.Multer.File> = request.files;

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE_MB) {
      throw new BadRequestException(
        `Общий размер файлов не должен превышать ${
          MAX_TOTAL_SIZE_MB / (1024 * 1024)
        } МБ.`,
      );
    }

    return next.handle();
  }
}
