import {
  applyDecorators,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '../../entities/user';
import { JwtAuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const authParams = this.reflector.getAllAndOverride<AuthInterface>(
      'authParams',
      [context.getHandler(), context.getClass()],
    );

    const { user } = context.switchToHttp().getRequest();

    if (!authParams) {
      return true;
    }

    if (authParams.admin) {
      return user.role === UserRole.admin;
    }
  }
}

interface AuthInterface {
  admin?: boolean;
}

export const EnableAuth = (params?: AuthInterface) =>
  applyDecorators(
    SetMetadata('authParams', params),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    UseGuards(RoleGuard),
  );

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
