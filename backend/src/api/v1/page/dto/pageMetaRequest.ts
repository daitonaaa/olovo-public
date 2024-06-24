import { ApiProperty } from '@nestjs/swagger';
import { PageMetaType } from 'src/entities/pageMeta';

export class PageMetaRequest {
  @ApiProperty({ required: false })
  public id?: number;

  @ApiProperty({
    required: true,
    enum: PageMetaType,
    example: PageMetaType.Title,
  })
  public role: PageMetaType;

  @ApiProperty({ required: false })
  public value: string;
}
