import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from '../config/models/auth.config';
import { AuthHelper } from './auth.helper';
import { JwtStrategy } from './auth.strategy';
import { AppConfigModule } from '../config/app.config.module';
import { RepositoryModule } from '../../database/repositories/repository.module';

@Module({
  imports: [
    RepositoryModule,
    AppConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AuthConfig],
      useFactory: (config: AuthConfig) => ({
        secret: config.jwtKey,
        signOptions: { expiresIn: config.jwtExpires },
      }),
    }),
  ],
  providers: [AuthService, AuthHelper, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
