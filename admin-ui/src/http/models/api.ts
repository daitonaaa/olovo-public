import { Nullable } from '../../types';

export interface Meta {
  title: string;
}

export interface BaseResponseEntity {
  readonly id: number;
  readonly dateCreated: string;
  readonly updatedAt: Nullable<string>;
  readonly deletedAt: Nullable<string>;
}

export type WithBaseEntity<T> = T & BaseResponseEntity;

interface BasePageApi {
  name: string;
  url: string;
  isRegional: boolean;
  isPublished: boolean;
  isCrud: boolean;
}

export interface BaseNodeParamApi {
  value: string;
  pageNodeId?: number;
  id?: number;
  componentType: FieldType;
}

interface BasePageNodeApi {
  name: string;
  order: number;
  isWrappedContainer: boolean;
  nodeParam: BaseNodeParamApi[];
}

interface BaseComponentApi extends BaseResponseEntity {
  name: string;
  label: string;
}

export interface PageNodeResponseApi extends BaseResponseEntity, BasePageNodeApi {
  component: BaseComponentApi;
}

export interface PageResponseApi extends BasePageApi, BaseResponseEntity {
  pageNode: PageNodeResponseApi[];
  pageMeta: PageMetaResponseApi[];
}

export interface PageRequestApi extends BasePageApi {
  id?: number;
  pageNode: PageNodeRequestApi[];
  pageMeta: PageMetaRequestApi[];
}

export interface PageNodeRequestApi extends BasePageNodeApi {
  id?: number;
  componentId: number;
}

export interface PageMetaRequestApi {
  id?: number;
  role: PageMetaType;
  value: string;
}

export enum FieldType {
  Title = 1,
  Description = 2,
  Url = 3,
  StringArray,
  Json,
  HtmlText,
  FilesPicker,
  Meta,
}

export interface ComponentApi extends BaseComponentApi, BaseResponseEntity {
  componentTemplate: ComponentTemplateApi[];
}

export interface ComponentTemplateApi {
  componentType: FieldType;
}

export interface UpdatableComponentRequest extends ComponentRequest {
  id?: number;
}

export interface ComponentRequest {
  name: string;
  label: string;
  componentTemplate: FieldType[];
}

export enum PageMetaType {
  Title = 1,
  Description = 2,
  OgTitle = 3,
  OgDesc = 4,
  OgImageSource = 5,
}

export class DeleteRequestApi {
  public id: number | undefined;
}

export type PageMetaResponseApi = PageMetaRequestApi;

export interface SettingsRequest {
  publicEmail: string;
  systemEmail: string;
  phoneNumber: string;
  head: string;
  isTechnicalWork: boolean;
  siteName: string;
  confidentialityUrl: string;
  personalDataUrl: string;
}

export interface Menu {
  label: string;
  level: number;
  url?: string;
  order?: number;
  parent: Menu;
  children: Menu[];
}

export interface FileSubject {
  subjectId?: number | string;
  subjectField?: string;
  subjectEntityName?: string;
}

export type FileApi = FileSubject &
  BaseResponseEntity & {
    name: string;
    path: string;
    mimeType: string;
    size: number;
    extensions: string;
  };

export interface MenuRecordApiModel {
  dateCreated: Date | null;
  deletedAt: Date | null;
  id: number | string;
  label: string;
  level?: any;
  name: string;
  order: number;
  updatedAt: Date | null;
  url: string;
  parent?: MenuRecordApiModel | null;
  children?: SubMenuRecordApiModel[];
}

export type SubMenuRecordApiModel = Omit<MenuRecordApiModel, 'children'>;

export type MenuResponseApiModel = Record<string, MenuRecordApiModel[]>;
