import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserModel, LoginUserModel } from './auth.model';
import { User, UserRole } from '../../entities/user';
import { CoreRepository } from '../../database/repositories/core.repository';
import { AuthHelper } from './auth.helper';
import { SmtpConfig } from '../config/models/smtp.config';

// https://betterprogramming.pub/nestjs-authentication-with-jwt-and-postgres-50de6341f490
@Injectable()
export class AuthService {
  constructor(
    private readonly repository: CoreRepository,
    private readonly helper: AuthHelper,
    private readonly smtpConfig: SmtpConfig,
  ) {}

  private async create(body: CreateUserModel): Promise<User | never> {
    const { nickname, email, password, role } = body;
    const repo = this.repository.getEntityManager().getRepository(User);
    let user: User = await repo.findOne({ where: { email } });
    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.nickName = nickname;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.role = role;

    return repo.save(user);
  }

  public async login(body: LoginUserModel): Promise<string | never> {
    const { email, password } = body;
    const repo = this.repository.getEntityManager().getRepository(User);
    const user: User = await repo.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return this.helper.generateToken(user);
  }

  public async refreshToken(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }

  async resolveFirstAdminUserOnAppInit() {
    const DEFAULT_USER_PASS = '88888888';
    const adminUser = await this.repository
      .getEntityManager()
      .getRepository(User)
      .findOne({ where: { role: UserRole.admin } });
    if (!adminUser) {
      await this.create({
        email: this.smtpConfig.authUser,
        nickname: 'default-user',
        password: DEFAULT_USER_PASS,
        role: UserRole.admin,
      });
    }
  }
}
