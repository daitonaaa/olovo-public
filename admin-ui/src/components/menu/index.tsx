import React from 'react';
import { AnimateWrapper } from '../animate-wrapper';
import { BoxWrapper } from '../styled';
import { MenuTabs } from './components/menuTabs';
import { MenuControls } from './components/menuControls';
import { MenuList } from './components/menuList';

export const MenuApp: React.FC = () => {
  return (
    <AnimateWrapper>
      <BoxWrapper>
        <MenuTabs />
        <MenuList />
      </BoxWrapper>
      <MenuControls />
    </AnimateWrapper>
  );
};
