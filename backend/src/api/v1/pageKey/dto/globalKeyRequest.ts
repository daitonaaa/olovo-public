import { ApiProperty } from '@nestjs/swagger';

export class GlobalKeyRequest {
  @ApiProperty({ required: true })
  public key: string;

  @ApiProperty({ required: true })
  public value: string;
}
