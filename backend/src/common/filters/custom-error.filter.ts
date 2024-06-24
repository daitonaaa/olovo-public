import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomErrorFilter implements ExceptionFilter {
  public catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      error instanceof HttpException && error.getStatus
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return response.status(status).send({
      statusCode: status,
      message: (error as any).response?.message || error.message,
    });
  }
}
