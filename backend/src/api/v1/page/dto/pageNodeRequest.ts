import { ApiProperty } from '@nestjs/swagger';
import { NodeParamRequest } from './nodeParamRequest';

export class PageNoderequest {
  @ApiProperty({ required: false })
  public id?: number;

  @ApiProperty({ required: true })
  public name: string;

  @ApiProperty({ required: true })
  public order: number;

  @ApiProperty({ required: false })
  public isWrappedContainer?: boolean;

  @ApiProperty({ required: true })
  public componentId: number;

  @ApiProperty({ required: true, type: [NodeParamRequest] })
  public nodeParam: NodeParamRequest[];
}
