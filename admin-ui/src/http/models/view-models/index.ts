import { ComponentApi, FieldType, PageMetaType, PageResponseApi, WithBaseEntity } from '../api';
import { Nullable } from '../../../types';

export type PageViewModel = PageResponseApi;

export type ComponentViewModel = WithBaseEntity<ComponentApi>;

export type SettingsViewModel = Settings;

export interface PageNodeForm {
  id?: number;
  label: string;
  componentId: number;
  isWrappedContainer: boolean;
  name: string;
  nodeParam: PageNodeParamForm[];
}

export interface PageNodeParamForm {
  id?: number;
  componentType: FieldType;
  value: string;
}

type WithId<T> = {
  value: T;
  id?: number;
};

export interface PageForm {
  settings: {
    name: string;
    url: string;
    id?: number;
    lastChangedDate?: Nullable<string>;
    isPublished: boolean;
    isRegional: boolean;
    isCrud: boolean;
    meta: {
      title: WithId<string>;
      desc: WithId<string>;
      ogTitle: WithId<string>;
      ogDescription: WithId<string>;
      ogImageSource: WithId<string>;
    };
  };
  nodes: PageNodeForm[];
}

export interface PageMetaParamForm {
  id?: number;
  role: PageMetaType;
  value: string;
}

export interface AppInfo {
  companyName: string;
}

export interface User {
  nickName: string;
  email: string;
}

export interface Settings {
  publicEmail: string;
  systemEmail: string;
  phoneNumber: string;
  head: string;
  isTechnicalWork: boolean;
  siteName: string;
  confidentialityUrl: string;
  personalDataUrl: string;
}

export interface CrudConfig {
  name: string;
  path: string;
  label: string;
  entityLabelField: string;
  tableColumns: string[];
  slug: {
    field: string;
    type: any;
  };
  formParams: {
    [key: string]: {
      label: string;
      required: boolean;
      fieldType: FieldType;
      allow?: string[]; // for FilesPicker
      isMultiple: boolean; // for FilesPicker
    };
  };
}

export type SubMenuRecordModel = Omit<MenuRecordModel, 'items'>;

export interface MenuRecordModel {
  label: string;
  url: string;
  items: SubMenuRecordModel[];
  id: number;
  order: number;
}

export type MenuClientModel = {
  name: string;
  items: MenuRecordModel[];
};

export interface MenuRequestApiModel {
  namespaces: MenuClientModel[];
}
