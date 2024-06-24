export interface MenuRecordApiModel {
  dateCreated: Date | null;
  deletedAt: Date | null;
  id: number;
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
