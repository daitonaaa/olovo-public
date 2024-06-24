export enum AvailableComponentTypes {
  title = 1,
  description,
  url,
  stringArray,
  json,
  htmlText,
  FilesPicker,
  Meta,
}

interface BaseEntity {
  dateCreated: string;
  id: number;
}

export interface PageConfig extends BaseEntity {
  name: string;
  url: string;
  isPublished: boolean;
  isRegional: false;
  pageNode: PageNode[];
  pageMeta: PageMeta[];
}

export enum PageMetaType {
  Title = 1,
  Description = 2,
  OgTitle = 3,
  OgDesc = 4,
  OgImageSource = 5,
}

export interface PageMeta extends BaseEntity {
  role: PageMetaType;
  value: string;
}

export interface PageNode extends BaseEntity {
  name: string;
  order: number;
  isWrappedContainer: boolean;
  nodeParam: NodeParam[];
  pageMeta: PageMeta[];
}

export interface NodeParam extends BaseEntity {
  value: string;
  componentType: AvailableComponentTypes;
  pageNodeId: number;
}

export interface PageNodeViewModel {
  value: PageNode;
  children?: PageNodeViewModel[] | null;
}

export interface TextRecord extends BaseEntity {
  key: string;
  value: string;
}

export interface Upload {
  filename: string;
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
  [key: string]: MenuRecordModel[];
};
