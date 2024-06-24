import { Setting } from '../../../../entities/setting';
import { CrudModule } from '../../../../sections-config/types';
import { ApiProperty } from '@nestjs/swagger';

export type SettingsResponse = Setting & {
  cruds: CrudModule<any>[];
  uploadStaticPath: string;
};

export class CityResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  lt: number;

  @ApiProperty()
  lg: number;
}
