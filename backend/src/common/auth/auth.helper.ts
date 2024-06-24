import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CoreRepository } from '../../database/repositories/core.repository';
import { User } from '../../entities/user';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly repository: CoreRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
  }

  public async validateUser(decoded: any): Promise<User> {
    return this.repository
      .getEntityManager()
      .getRepository(User)
      .findOne(decoded.id);
  }

  public generateToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // private async validate(token: string): Promise<boolean | never> {
  //   const decoded: unknown = this.jwtService.verify(token);
  //   if (!decoded) {
  //     throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   }
  //
  //   const user: User = await this.validateUser(decoded);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   return true;
  // }
}
