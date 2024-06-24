import { createContext, useReducer, useContext, ReactNode, Dispatch, useState } from 'react';
import { MenuAction } from '../types';
import { menuReducer } from '../reducers/menuReducer';
import { MenuClientModel, MenuRecordModel } from '../../../http/models/view-models';

interface DataContextProps {
  state: MenuClientModel[];
  dispatch: Dispatch<MenuAction>;
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<React.SetStateAction<number>>;
  menuList: MenuRecordModel[];
}

const MenuContext = createContext<DataContextProps | null>(null);

const MenuProvider = ({ children, initialState }: { children: ReactNode; initialState: MenuClientModel[] }) => {
  const [state, dispatch] = useReducer<React.Reducer<MenuClientModel[], MenuAction>>(menuReducer, initialState);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <MenuContext.Provider
      value={{ state, dispatch, activeTabIndex, setActiveTabIndex, menuList: state[activeTabIndex]?.items || [] }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const useMenuContextData = (): DataContextProps => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenuContextData must be used within a MenuProvider');
  }

  return context;
};

export { MenuProvider, useMenuContextData };
