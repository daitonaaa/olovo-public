/* eslint-disable @typescript-eslint/no-magic-numbers */
import { NestFactory } from '@nestjs/core';
//import { AppState } from './common/appState';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

const bootstrap = async function bootstrap() {
  const app = await NestFactory.createApplicationContext(DatabaseModule);

  const dbService = app.get(DatabaseService);
  //AppState.Begin();
  await dbService.applyMigrations();
  //AppState.End();
  await app.close();
};

void bootstrap();
