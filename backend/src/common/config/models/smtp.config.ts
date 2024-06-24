import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class SmtpConfig {
  readonly host: string;
  readonly port: number;
  readonly isSecure: boolean;
  readonly authUser: string;
  readonly authPass: string;
  readonly defaultReportEmail: string;

  constructor(private readonly configService: AppConfigService) {
    this.host = this.configService.get('MAIL_SMTP_HOST');
    this.port = Number(this.configService.get('MAIL_SMTP_PORT'));
    this.isSecure = this.configService.get('MAIL_STMP_SECURE') === 'true';
    this.authUser = this.configService.get('MAIL_SMTP_AUTH_USER');
    this.authPass = this.configService.get('MAIL_SMTP_AUTH_PASS');
    this.defaultReportEmail = this.configService.get('DEFAULT_REPORT_MAIL');
  }
}
