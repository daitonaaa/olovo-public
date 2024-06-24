import { MenuClientModel } from '../../../http/models/view-models';
import { MenuAction } from '../types';

export const menuReducer = (state: MenuClientModel[], { type, payload }: MenuAction): MenuClientModel[] => {
  switch (type) {
    case 'ADD_NAME_SPACE':
      return [
        ...state,
        {
          name: payload.nameSpace,
          items: [],
        },
      ];

    case 'ADD_MENU_ITEM': {
      const updatedState = [...state];

      updatedState[payload.tabIndex].items.push(payload.item);

      return updatedState;
    }

    case 'UPDATE_MENU_ITEM': {
      const updatedState = [...state];

      const { tabIndex, menuItemIndex, item } = payload;

      const currentMenuItem = updatedState[tabIndex].items[menuItemIndex];

      updatedState[tabIndex].items[menuItemIndex] = {
        ...currentMenuItem,
        ...item,
      };

      return updatedState;
    }

    case 'DELETE_MENU_ITEM': {
      const updatedState = [...state];

      updatedState[payload.tabIndex].items.splice(payload.menuItemIndex, 1);

      return updatedState;
    }

    case 'MOVE_MENU_ITEM': {
      const updatedState = [...state];
      const { tabIndex, fromIndex, toIndex } = payload;

      const canMove =
        fromIndex >= 0 &&
        fromIndex < updatedState[tabIndex].items.length &&
        toIndex >= 0 &&
        toIndex < updatedState[tabIndex].items.length;

      if (canMove) {
        const [movedItem] = updatedState[tabIndex].items.splice(fromIndex, 1);
        updatedState[tabIndex].items.splice(toIndex, 0, movedItem);
      }

      return updatedState;
    }

    case 'ADD_SUB_MENU_ITEM': {
      const updatedState = [...state];

      updatedState[payload.tabIndex].items[payload.menuItemIndex].items.push(payload.item);

      return updatedState;
    }

    case 'MOVE_SUB_MENU_ITEM': {
      const updatedState = [...state];
      const { tabIndex, parentMenuIndex, fromIndex, toIndex, destinationParentMenuIndex } = payload;

      const targetParentMenuIndex =
        destinationParentMenuIndex !== undefined ? destinationParentMenuIndex : parentMenuIndex;

      const sourceChildren = updatedState[tabIndex].items[parentMenuIndex].items;
      const targetChildren = updatedState[tabIndex].items[targetParentMenuIndex].items;

      const canMove =
        fromIndex >= 0 && fromIndex < sourceChildren.length && toIndex >= 0 && toIndex <= targetChildren.length;

      if (canMove) {
        const [movedSubItem] = sourceChildren.splice(fromIndex, 1);
        targetChildren.splice(toIndex, 0, movedSubItem);
      }

      return updatedState;
    }

    case 'UPDATE_SUB_MENU_ITEM': {
      const updatedState = [...state];

      const { tabIndex, menuItemIndex, subMenuItemIndex, item } = payload;

      const currentSubMenu = updatedState[tabIndex].items[menuItemIndex].items[subMenuItemIndex];

      updatedState[tabIndex].items[menuItemIndex].items[subMenuItemIndex] = {
        ...currentSubMenu,
        ...item,
      };

      return updatedState;
    }

    case 'DELETE_SUB_MENU_ITEM': {
      const updatedState = [...state];

      const subMenuItems = updatedState[payload.tabIndex].items[payload.menuItemIndex].items;

      subMenuItems.splice(payload.subMenuItemIndex, 1);

      return updatedState;
    }

    default:
      return state;
  }
};
