import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty({ required: true, maxLength: 200 })
  public text: string;
}
