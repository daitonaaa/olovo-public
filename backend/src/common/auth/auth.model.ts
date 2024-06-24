import { UserRole } from '../../entities/user';

export class CreateUserModel {
  email: string;
  nickname: string;
  password: string;
  role: UserRole;
}

export class LoginUserModel {
  email: string;
  password: string;
}
