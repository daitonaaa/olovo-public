/* eslint-disable */
import { IconButton } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { FLexBlock } from '../../styled';
import { MenuSubItem, MenuSubListContainer } from '../styled';
import { SubMenuRecordModel } from '../../../http/models/view-models';
import { useMenuContextData } from '../context/menuContextProvider';
import { MenuItemModal } from './menuItemModal';
import { useState } from 'react';

const getItemStyle = (draggableStyle: any) => ({
  userSelect: 'none',
  marginTop: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  ...draggableStyle,
});

interface MenuSubListProps {
  data: SubMenuRecordModel[];
  parentMenuIndex: number;
}

export const MenuSubList = ({ data, parentMenuIndex }: MenuSubListProps) => {
  const { dispatch, activeTabIndex } = useMenuContextData();
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<number>();
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuRecordModel>();

  const isShowEditModal = activeSubMenuIndex !== undefined && activeSubMenu !== undefined;

  return (
    <>
      <Droppable droppableId={`sub-${parentMenuIndex}`} type="submenu" direction="vertical">
        {(provided, snapshot) => (
          <MenuSubListContainer ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((item, index) => {
              return (
                <Draggable key={`subvert-${item.id}`} draggableId={`subvert-${item.id}`} index={index}>
                  {(provided, snapshot) => (
                    <MenuSubItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style)}
                      isDragging={snapshot.isDragging}
                    >
                      <p>{item.label}</p>
                      <FLexBlock style={{ gap: '2px' }}>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={() => {
                            setActiveSubMenu(item);
                            setActiveSubMenuIndex(index);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={() =>
                            dispatch({
                              type: 'DELETE_SUB_MENU_ITEM',
                              payload: {
                                tabIndex: activeTabIndex,
                                menuItemIndex: parentMenuIndex,
                                subMenuItemIndex: index,
                              },
                            })
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </FLexBlock>
                    </MenuSubItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </MenuSubListContainer>
        )}
      </Droppable>
      {isShowEditModal && (
        <MenuItemModal
          isShown={isShowEditModal}
          initialValues={{ name: activeSubMenu?.label || '', url: activeSubMenu?.url || '' }}
          onClose={() => {
            setActiveSubMenuIndex(undefined);
            setActiveSubMenu(undefined);
          }}
          onSubmit={values => {
            dispatch({
              type: 'UPDATE_SUB_MENU_ITEM',
              payload: {
                tabIndex: activeTabIndex,
                menuItemIndex: parentMenuIndex,
                subMenuItemIndex: activeSubMenuIndex || 0,
                item: {
                  label: values.name,
                  url: values.url,
                },
              },
            });
          }}
        />
      )}
    </>
  );
};
