import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { AppConfig } from '../../../common/config/models/app.config';

@Controller()
@ApiTags('Info')
export class InfoController {
  constructor(private readonly appConfig: AppConfig) {}

  @Get()
  info() {
    return {
      companyName: this.appConfig.companyName,
    };
  }
}
