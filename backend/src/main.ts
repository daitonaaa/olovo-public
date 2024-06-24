import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppConfig } from './common/config/models/app.config';
import { AppLogger } from './common/logger/app-logger';
import { ValidationPipe } from '@nestjs/common';
import { CustomErrorFilter } from './common/filters/custom-error.filter';
import { join } from 'path';
import { FileUploadErrorFilter } from './common/filters/file-upload-error.filter';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('CMS Public')
    .setDescription('Awesome app for good people')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1/swagger', app, document); // DON'T CHANGE ME

  app.enableCors();

  app.useGlobalFilters(new CustomErrorFilter());
  app.useGlobalFilters(new FileUploadErrorFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '../../static'), {
    prefix: '/static/',
  });

  const appConfig = app.get(AppConfig);
  const logger = new AppLogger('NestApplication');
  app.useLogger(logger);

  logger.log(`Nest application start on port ${appConfig.port}`);
  await app.listen(appConfig.port);
}

main();
