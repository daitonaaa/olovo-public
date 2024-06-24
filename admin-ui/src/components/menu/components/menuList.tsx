import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Container, MenuItem } from '../styled';
import { FLexBlock } from '../../styled';
import { useMenuContextData } from '../context/menuContextProvider';
import { MenuItemModal } from './menuItemModal';
import { MenuSubList } from './menuSubLIst';
import AddIcon from '@material-ui/icons/Add';

const getItemStyle = (draggableStyle: any) => ({
  userSelect: 'none',
  marginBottom: '6px',
  position: 'relative',
  ...draggableStyle,
});

export const MenuList = () => {
  const { menuList, dispatch, activeTabIndex } = useMenuContextData();
  const [menuIndexForAddSubMenu, setActiveMenuItemIndex] = useState<number>();
  const [editMenuItemIndex, setMenuItemEditIndex] = useState<number>();
  const [showAddModalSub, setShowAddModalSub] = useState(false);

  const editableMenuItem = editMenuItemIndex !== undefined ? menuList[editMenuItemIndex] : undefined;
  const shouldShowEditModal = editableMenuItem !== undefined && editMenuItemIndex !== undefined;

  const openEditModal = (menuItemIndex: number) => {
    setMenuItemEditIndex(menuItemIndex);
  };

  const closeEditModal = () => {
    setMenuItemEditIndex(undefined);
  };

  const dragHandler = (params: DropResult) => {
    const toIndex = params.destination?.index;

    if (toIndex === undefined) {
      return;
    }

    const { source, destination, type } = params;

    if (type === 'menu-list') {
      dispatch({
        type: 'MOVE_MENU_ITEM',
        payload: {
          tabIndex: activeTabIndex,
          fromIndex: source.index,
          toIndex,
        },
      });
    } else if (type === 'submenu') {
      if (!destination) {
        return;
      }
      const sourceParentIndex = parseInt(source.droppableId.split('-')[1]);
      const destinationParentIndex = parseInt(destination.droppableId.split('-')[1]);

      dispatch({
        type: 'MOVE_SUB_MENU_ITEM',
        payload: {
          tabIndex: activeTabIndex,
          parentMenuIndex: sourceParentIndex,
          fromIndex: source.index,
          toIndex,
          destinationParentMenuIndex: destinationParentIndex,
        },
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={dragHandler}>
        <Droppable droppableId="board" type="menu-list">
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              <div style={{ marginTop: '16px' }}>
                {menuList.map((item, idx: number) => {
                  return (
                    <Draggable key={`vert-${item.id}`} draggableId={`vert-${item.id}`} index={idx}>
                      {(provided, snapshot) => (
                        <MenuItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(provided.draggableProps.style)}
                          isDragging={snapshot.isDragging}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>{item.label}</div>
                            <FLexBlock style={{ gap: '2px' }}>
                              <IconButton
                                size="small"
                                color="inherit"
                                onClick={() => {
                                  setShowAddModalSub(true);
                                  setActiveMenuItemIndex(idx);
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="inherit" onClick={() => openEditModal(idx)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  dispatch({
                                    type: 'DELETE_MENU_ITEM',
                                    payload: {
                                      tabIndex: activeTabIndex,
                                      menuItemIndex: idx,
                                    },
                                  });
                                }}
                                color="inherit"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </FLexBlock>
                          </div>
                          {item.items?.length > 0 && <MenuSubList data={item.items} parentMenuIndex={idx} />}
                        </MenuItem>
                      )}
                    </Draggable>
                  );
                })}
              </div>
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      {shouldShowEditModal && (
        <MenuItemModal
          isShown={shouldShowEditModal}
          initialValues={{ name: editableMenuItem.label, url: editableMenuItem.url }}
          onClose={closeEditModal}
          onSubmit={values => {
            dispatch({
              type: 'UPDATE_MENU_ITEM',
              payload: {
                tabIndex: activeTabIndex,
                menuItemIndex: editMenuItemIndex,
                item: {
                  label: values.name,
                  url: values.url,
                },
              },
            });
          }}
        />
      )}
      {showAddModalSub && menuIndexForAddSubMenu !== undefined && (
        <MenuItemModal
          isShown={showAddModalSub}
          onClose={() => {
            setShowAddModalSub(false);
          }}
          onSubmit={values => {
            dispatch({
              type: 'ADD_SUB_MENU_ITEM',
              payload: {
                tabIndex: activeTabIndex,
                menuItemIndex: menuIndexForAddSubMenu,
                item: {
                  id: new Date().valueOf(),
                  label: values.name,
                  url: values.url,
                  order: 0,
                },
              },
            });
          }}
        />
      )}
    </>
  );
};
