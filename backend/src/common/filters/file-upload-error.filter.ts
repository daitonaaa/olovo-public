import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { FileUploadError } from '../files/types';
import { SentryService } from '@ntegral/nestjs-sentry';

@Catch(FileUploadError)
export class FileUploadErrorFilter implements ExceptionFilter {
  name = 'FileUploadErrorFilter';

  public catch(error: FileUploadError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const response_json = {
      statusCode: status,
      message: 'Error files processing',
      err_message: error.message,
      details: error.details,
    };

    SentryService.SentryServiceInstance()
      .instance()
      .captureException(error, { extra: response_json });
    return response.status(status).send(response_json);
  }
}
