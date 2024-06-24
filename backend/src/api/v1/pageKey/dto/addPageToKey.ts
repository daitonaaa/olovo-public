import { ApiProperty } from '@nestjs/swagger';

export class AddPageToKeyRequest {
  @ApiProperty({ required: true })
  public key: string;

  @ApiProperty({ required: true })
  public pageId: number;

  @ApiProperty({ required: false })
  public pageIdForDelete: number;
}
