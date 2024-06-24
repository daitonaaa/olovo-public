import { ApiProperty } from '@nestjs/swagger';
import { FieldType } from 'src/common/types/fieldType';

export class ComponentRequest {
  @ApiProperty({ required: false })
  public id?: number;

  @ApiProperty({ required: true })
  public name: string;

  @ApiProperty({ required: true })
  public label: string;

  @ApiProperty({
    required: true,
    enum: FieldType,
    isArray: true,
    example: [FieldType.Title],
    title: 'Title = 1, ',
  })
  public componentTemplate: FieldType[];
}
