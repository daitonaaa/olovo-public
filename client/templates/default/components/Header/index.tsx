import { MenuRecordModel } from '@/core/admin/types';
import React from 'react';

interface HeaderProps {
  menu: MenuRecordModel[];
}

export const Header: React.FC<HeaderProps> = () => {
  return <div>Header</div>;
};
