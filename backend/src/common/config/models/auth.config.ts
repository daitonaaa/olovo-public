import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class AuthConfig {
  readonly jwtKey: string;
  readonly jwtExpires: string;

  constructor(private readonly configService: AppConfigService) {
    this.jwtKey = this.configService.get('AUTH_JWT_KEY');
    this.jwtExpires = this.configService.get('AUTH_JWT_EXPIRES');
  }
}
