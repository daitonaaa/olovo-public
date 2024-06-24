import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class DatabaseConfig {
  readonly type: string;
  readonly userName: string;
  readonly port: number;
  readonly host: string;
  readonly password: string;
  readonly base: string;
  readonly logging: boolean;
  readonly maxConnections: number;

  constructor(private readonly configService: AppConfigService) {
    this.type = this.configService.get('DB_TYPE');
    this.userName = this.configService.get('DB_USERNAME');
    this.port = this.configService.get('DB_PORT');
    this.host = this.configService.get('DB_HOST');
    this.password = this.configService.get('DB_PASSWORD');
    this.base = this.configService.get('DB_BASE');
    this.logging = this.configService.get('DB_LOGGING');
    this.maxConnections = this.configService.get('DB_MAX_CONNECTIONS');
  }
}
