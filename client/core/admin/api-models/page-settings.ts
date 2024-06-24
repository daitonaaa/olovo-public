import { MenuResponseApiModel } from '@/core/admin/api-models/menu';
import { PageConfig } from '../types';

export interface PageSettings {
  admin?: {
    crudListData?: any;
    crudSingleData?: any;
    page?: PageConfig;
    menu: MenuResponseApiModel;
  };
}
