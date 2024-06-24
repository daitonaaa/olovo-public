import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBody } from '@nestjs/swagger';
import { EmailDto } from './dto/email.dto';
import * as nodemailer from 'nodemailer';
import { SmtpConfig } from '../../../common/config/models/smtp.config';
import { AppConfig } from '../../../common/config/models/app.config';

@Controller()
@ApiTags('Func')
export class FuncController {
  constructor(
    private readonly smtpConfig: SmtpConfig,
    private readonly appConfig: AppConfig,
  ) {}

  @Post('email')
  @ApiBody({ type: EmailDto })
  async email(@Body() body: EmailDto) {
    const transport = nodemailer.createTransport({
      host: this.smtpConfig.host,
      port: this.smtpConfig.port,
      secure: this.smtpConfig.isSecure,
      auth: {
        user: this.smtpConfig.authUser,
        pass: this.smtpConfig.authPass,
      },
      logger: true,
      debug: this.appConfig.isLocal,
    });

    await transport.sendMail({
      to: this.smtpConfig.defaultReportEmail.split(','),
      from: this.smtpConfig.authUser,
      subject: 'Новое сообщение с сайта',
      text: body.text,
    });

    transport.close();
    return body.text;
  }
}
