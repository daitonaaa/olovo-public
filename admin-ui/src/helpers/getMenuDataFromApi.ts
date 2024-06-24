import { MenuResponseApiModel } from '../http/models/api';
import { MenuClientModel } from '../http/models/view-models';

export const getMenuDataFromApi = (apiModel: MenuResponseApiModel): MenuClientModel[] => {
  const result = Object.keys(apiModel).map(name => ({
    name,
    items: apiModel[name].map(menuItem => ({
      label: menuItem.label,
      url: menuItem.url,
      order: menuItem.order,
      id: menuItem.id,
      items: menuItem.children?.map(subMenuItem => ({
        label: subMenuItem.label,
        url: subMenuItem.url,
        id: subMenuItem.id,
        order: subMenuItem.order,
      })),
    })),
  })) as MenuClientModel[];

  const sortItemsByOrder = (data: MenuClientModel[]) => {
    return data.map(menuList => {
      return {
        ...menuList,
        items: menuList.items
          .sort((a, b) => a.order - b.order)
          .map(item => ({
            ...item,
            items: item.items ? item.items.sort((a, b) => a.order - b.order) : [],
          })),
      };
    });
  };

  return sortItemsByOrder(result);
};
