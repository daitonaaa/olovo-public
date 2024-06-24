import { ApiProperty } from '@nestjs/swagger';

export class SettingsDto {
  @ApiProperty({ required: false })
  public id?: number;

  @ApiProperty({ required: false })
  publicEmail: string;

  @ApiProperty({ required: false })
  systemEmail: string;

  @ApiProperty({ required: false })
  phoneNumber: string;

  @ApiProperty({ required: false })
  head: string;

  @ApiProperty({ required: false })
  isTechnicalWork: boolean;

  @ApiProperty({ required: false })
  siteName: string;

  @ApiProperty({ required: false })
  confidentialityUrl: string;

  @ApiProperty({ required: false })
  personalDataUrl: string;
}

export class MenuItemDto {
  @ApiProperty({ required: true })
  label: string;

  @ApiProperty({ required: false })
  url: string;

  @ApiProperty({ required: false })
  order: number;

  @ApiProperty({ required: false, type: MenuItemDto, isArray: true })
  items: MenuItemDto[];
}

export class MenuNamespace {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false, type: MenuItemDto, isArray: true })
  items: MenuItemDto[];
}

export class MenuDto {
  @ApiProperty({ required: true, type: MenuNamespace, isArray: true })
  namespaces: MenuNamespace[];
}
