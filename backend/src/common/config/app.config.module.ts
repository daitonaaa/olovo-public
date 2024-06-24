import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import { AppConfig } from './models/app.config';
import { SmtpConfig } from './models/smtp.config';
import { DatabaseConfig } from './models/database.config';
import { AuthConfig } from './models/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env', '/var/run/secrets/vault/conf/.env'],
    }),
  ],
  providers: [
    AppConfig,
    DatabaseConfig,
    ConfigService,
    AppConfigService,
    SmtpConfig,
    AuthConfig,
  ],
  exports: [AppConfig, DatabaseConfig, SmtpConfig, AuthConfig],
})
export class AppConfigModule {}
