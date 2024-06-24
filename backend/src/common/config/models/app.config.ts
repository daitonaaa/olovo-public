import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class AppConfig {
  readonly port: number;
  readonly isProd: boolean;
  readonly isLocal: boolean;
  readonly companyName: string;
  readonly sentry_dsn: string;
  readonly environment: string;
  readonly uploadDir: string;
  readonly uploadStaticPath: string;
  readonly clientHostname: string;

  constructor(private readonly configService: AppConfigService) {
    this.port = this.configService.get('APP_PORT');
    this.companyName = this.configService.get('APP_COMPANY_NAME');
    this.sentry_dsn = this.configService.get('SENTRY_DSN');
    this.uploadDir = this.configService.get('UPLOAD_DIR');
    this.uploadStaticPath = this.configService.get('UPLOAD_STATIC_PATH');
    this.clientHostname = this.configService.get('CLIENT_HOSTNAME');

    const appEnvName: string = this.configService.get('APP_ENVIRONMENT_NAME');
    this.isLocal = appEnvName === 'local';
    this.isProd = appEnvName === 'prod';
    this.environment = appEnvName;
  }
}
