import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ required: true })
  public email: string;

  @ApiProperty({ required: true })
  public password: string;
}
