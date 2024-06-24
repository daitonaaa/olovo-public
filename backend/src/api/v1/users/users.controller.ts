import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBody } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user.dto';
import { AuthService } from '../../../common/auth/auth.service';
import { EnableAuth, RequestUser } from '../../../common/auth/auth.decorators';
import { User } from '../../../entities/user';

@Controller()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @ApiBody({ type: UserLoginDto })
  async login(@Body() body: UserLoginDto) {
    return this.authService.login({
      email: body.email,
      password: body.password,
    });
  }

  @Get('current')
  @EnableAuth()
  async currentUser(@RequestUser() user: User): Promise<any> {
    return user;
  }
}
