import { EntityTarget } from 'typeorm/common/EntityTarget';
import { FieldType } from '../common/types/fieldType';
import { ParamOption } from '@nestjsx/crud';

export interface CrudModule<T> {
  entity: EntityTarget<T>;
  entityNameStr: string;
  name: string;
  /**
   * WARN: Should match with folder name
   *
   * Don't use first slash in path
   * bad: /projects
   * cool: projects
   */
  path: string;
  label: string;
  entityLabelField: keyof T;
  viewModelFields: (keyof T)[];
  slug: {
    field: keyof T;
    type: ParamOption['type'];
  };
  tableColumns: (keyof T)[];
  formParams: {
    [key in keyof T]?: {
      label: string;
      required?: boolean;
      fieldType: FieldType;
      allow?: string[]; // for FilesPicker
      isMultiple?: boolean; // for FilesPicker
    };
  };
}

export interface ComponentSeed {
  label: string;
  viewSectionName: string;
  fields: FieldType[];
}
