import { MenuClientModel, PageMeta, PageMetaType } from './types';
import React from 'react';
import { Head } from '../shared/components/head';
import { MenuResponseApiModel } from '@/core/admin/api-models/menu';

/**
 * @param start
 * @param end
 * @example getRangeArr(1, 5) = [1, 2, 3, 4, 5]
 */
export const getRangeArr = (start: number, end: number): number[] => {
  let cursor = start;
  return [cursor, ...new Array(end - start).fill(null).map(() => ++cursor)];
};

export const safeParseJsonValue = <T>(candidate: string, defaultValue: T): T => {
  try {
    return JSON.parse(candidate) as T;
  } catch (err) {
    return defaultValue;
  }
};

export const getHeadPropsFromPageMeta = (
  pageMeta: PageMeta[]
): React.ComponentProps<typeof Head> => {
  const getMeta = (type: PageMetaType) => pageMeta.find((m) => m.role === type)?.value;
  return {
    title: getMeta(PageMetaType.Title),
    description: getMeta(PageMetaType.Description),
    ogDescription: getMeta(PageMetaType.OgDesc),
    ogImageName: getMeta(PageMetaType.OgImageSource),
    ogTitle: getMeta(PageMetaType.OgTitle),
  };
};

export const getMenuDataFromApi = (apiModel: MenuResponseApiModel): MenuClientModel => {
  const result = Object.keys(apiModel).reduce((acc, name) => {
    acc[name] = apiModel[name]
      .map((menuItem) => ({
        label: menuItem.label,
        url: menuItem.url,
        order: menuItem.order,
        id: menuItem.id,
        items:
          menuItem.children?.map((subMenuItem) => ({
            label: subMenuItem.label,
            url: subMenuItem.url,
            id: subMenuItem.id,
            order: subMenuItem.order,
          })) || [],
      }))
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        ...item,
        items: item.items ? item.items.sort((a, b) => a.order - b.order) : [],
      }));
    return acc;
  }, {} as MenuClientModel);

  return result;
};
