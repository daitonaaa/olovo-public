import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { TypeormLoggerAdapter } from '../common/logger/typeorm-logger-adapter';
import { createConnection, MigrationExecutor } from 'typeorm';
import { DatabaseConfig } from '../common/config/models/database.config';
import { AppLogger } from '../common/logger/app-logger';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly logger: AppLogger,
    private readonly config: DatabaseConfig,
    private readonly typeormLoggerAdapter: TypeormLoggerAdapter,
  ) {
    logger.setContext('CreateDatabaseService');
  }

  public async applyMigrations() {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const ormConfig = require(path.resolve('ormconfig.js'));

    for (const cfg of ormConfig) {
      this.logger.log(`Connection configuration found [${cfg.name}]`);

      // Enable logging
      cfg.logging = true;
      cfg.logger = this.typeormLoggerAdapter;

      const connection = await createConnection(cfg.name);
      const queryRunner = connection.createQueryRunner();
      const migrator = new MigrationExecutor(connection, queryRunner);

      await migrator.executePendingMigrations();
    }
  }
}
