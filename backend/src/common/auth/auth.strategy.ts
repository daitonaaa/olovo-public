import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthHelper } from './auth.helper';
import { User } from '../../entities/user';
import { AuthConfig } from '../config/models/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly helper: AuthHelper,
    private readonly authConfig: AuthConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwtKey,
      ignoreExpiration: true,
    });
  }

  private validate(payload: object): Promise<User | never> {
    return this.helper.validateUser(payload);
  }
}
