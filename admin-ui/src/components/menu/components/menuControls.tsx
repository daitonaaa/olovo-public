import React, { useState } from 'react';
import { BlockButton } from '../styled';
import { Button } from '@material-ui/core';
import { useMenuContextData } from '../context/menuContextProvider';
import { MenuItemModal } from './menuItemModal';
import { createMenuSettings } from '../../../http/endpoints';

export const MenuControls: React.FC = () => {
  const { state, dispatch, activeTabIndex } = useMenuContextData();

  if (!state.length) return null;

  const [showMenuItemModal, setMenuItemModal] = useState(false);

  const saveHandler = async () => {
    const menuData = state.map(tab => ({
      ...tab,
      items: tab.items.map((menuItem, index) => ({
        ...menuItem,
        order: index,
        items: menuItem.items.map((subMenuItem, subIndex) => ({
          ...subMenuItem,
          order: subIndex,
        })),
      })),
    }));

    try {
      await createMenuSettings({
        namespaces: menuData,
      });

      alert('Меню успешно сохранено');
    } catch (error) {
      console.error(error);

      alert('Произошла ошибка при сохранении меню');
    }
  };

  return (
    <>
      <BlockButton>
        <Button color="primary" variant="contained" type="submit" size="large" onClick={() => setMenuItemModal(true)}>
          Добавить элемент меню
        </Button>
        <Button color="primary" variant="contained" type="submit" size="large" onClick={saveHandler}>
          Сохранить
        </Button>
      </BlockButton>
      <MenuItemModal
        isShown={showMenuItemModal}
        onClose={() => setMenuItemModal(false)}
        onSubmit={values =>
          dispatch({
            type: 'ADD_MENU_ITEM',
            payload: {
              tabIndex: activeTabIndex,
              item: {
                id: new Date().valueOf(),
                label: values.name,
                url: values.url,
                items: [],
                order: 0,
              },
            },
          })
        }
      />
    </>
  );
};
