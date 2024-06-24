import { Module } from '@nestjs/common';
import { AppLogger } from './app-logger';
import { TypeormLoggerAdapter } from './typeorm-logger-adapter';

@Module({
  providers: [AppLogger, TypeormLoggerAdapter],
  exports: [AppLogger, TypeormLoggerAdapter],
})
export class LoggerModule {}
