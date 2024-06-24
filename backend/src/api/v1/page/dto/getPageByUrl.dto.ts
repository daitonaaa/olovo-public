import { ApiProperty } from '@nestjs/swagger';

export class GetPageByUrlDto {
  @ApiProperty({ required: true })
  public url: string;
}
