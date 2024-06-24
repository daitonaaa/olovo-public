import { MenuRecordModel, SubMenuRecordModel } from '../../http/models/view-models';

export type MenuAction =
  | { type: 'ADD_NAME_SPACE'; payload: { nameSpace: string } }
  | { type: 'ADD_MENU_ITEM'; payload: { tabIndex: number; item: MenuRecordModel } }
  | {
      type: 'UPDATE_MENU_ITEM';
      payload: { tabIndex: number; menuItemIndex: number; item: Omit<MenuRecordModel, 'items' | 'id' | 'order'> };
    }
  | { type: 'DELETE_MENU_ITEM'; payload: { tabIndex: number; menuItemIndex: number } }
  | { type: 'MOVE_MENU_ITEM'; payload: { tabIndex: number; fromIndex: number; toIndex: number } }
  | { type: 'ADD_SUB_MENU_ITEM'; payload: { tabIndex: number; menuItemIndex: number; item: SubMenuRecordModel } }
  | {
      type: 'MOVE_SUB_MENU_ITEM';
      payload: {
        tabIndex: number;
        parentMenuIndex: number;
        fromIndex: number;
        toIndex: number;
        destinationParentMenuIndex: number;
      };
    }
  | {
      type: 'UPDATE_SUB_MENU_ITEM';
      payload: {
        tabIndex: number;
        menuItemIndex: number;
        subMenuItemIndex: number;
        item: Omit<SubMenuRecordModel, 'id' | 'order'>;
      };
    }
  | {
      type: 'DELETE_SUB_MENU_ITEM';
      payload: {
        tabIndex: number;
        menuItemIndex: number;
        subMenuItemIndex: number;
      };
    };
