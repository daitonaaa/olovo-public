import { ApiProperty } from '@nestjs/swagger';
import { PageMetaRequest } from './pageMetaRequest';
import { PageNoderequest } from './pageNodeRequest';

export class PageRequest {
  @ApiProperty({ required: false })
  public id?: number;

  @ApiProperty({ required: true })
  public name: string;

  @ApiProperty({ required: true })
  public url: string;

  @ApiProperty({ required: true })
  public isPublished: boolean;

  @ApiProperty({ required: true, type: [PageNoderequest] })
  pageNode: PageNoderequest[];

  @ApiProperty({ required: true })
  public isRegional: boolean;

  @ApiProperty({ required: false, type: [PageMetaRequest] })
  pageMeta: PageMetaRequest[];

  @ApiProperty({ required: false })
  public isCrud?: boolean;
}

export class RequestDelete {
  @ApiProperty({ required: true })
  public id: number;
}
