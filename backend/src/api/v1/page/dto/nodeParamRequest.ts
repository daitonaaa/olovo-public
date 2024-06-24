import { ApiProperty } from '@nestjs/swagger';
import { FieldType } from 'src/common/types/fieldType';

export class NodeParamRequest {
  @ApiProperty({ required: false })
  public id?: number;

  @ApiProperty({ required: true })
  public value: string;

  @ApiProperty({
    required: true,
    enum: FieldType,
    example: FieldType.Title,
  })
  public componentType: FieldType;
}
