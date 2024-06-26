import { MenuRecordModel } from '@/core/admin/types';
import React from 'react';
import { BlockContact, BlockMenu, BlockText, Content, Desc, Menu, Title, Wrapper } from './styled';
import Link from 'next/link';
import { ArrowButton } from '../ArrowButton';
import { Cursor } from '@/currentTemplate/theme/components';

interface HeaderProps {
  menu: MenuRecordModel[];
}

const menuData = [
  { label: 'Продукция', url: 'products', items: [], id: 1, order: 1 },
  { label: 'Услуги', url: 'services', items: [], id: 2, order: 2 },
  { label: 'О компании', url: 'about', items: [], id: 3, order: 3 },
  { label: 'Контакты', url: 'contact', items: [], id: 3, order: 3 },
];

export const Header: React.FC<HeaderProps> = ({ menu }) => {
  return (
    <Wrapper>
      <BlockMenu>
        <img src="/assets/icon/logo.svg" />
        <Menu>
          {menuData.map((item) => (
            <Link href={item.url} key={item.id}>
              <a className="menu__link">{item.label}</a>
            </Link>
          ))}
        </Menu>
      </BlockMenu>
      <Content>
        <BlockText>
          <Title>Урал Олово металлургическая компания </Title>
          <Desc>
            Выполняем весь перечень услуг по изготовлению
            <br /> и проектированию деталей, используемых в различных отраслях
          </Desc>
          <ArrowButton title="Перейти в каталог " />
        </BlockText>
        <BlockContact>
          <Cursor>
            <img src="/assets/icon/phone.svg" />
          </Cursor>
          <Cursor>
            <img src="/assets/icon/whatsapp.svg" />
          </Cursor>
          <Cursor>
            <img src="/assets/icon/message.svg" />
          </Cursor>
        </BlockContact>
      </Content>
    </Wrapper>
  );
};
