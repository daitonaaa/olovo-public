import { MenuRecordModel } from '@/core/admin/types';
import React from 'react';

import { BlockContact, BlockMeny, BlockText, Content, Desc, Meny, Title, Wrapper } from './styled';
import Link from 'next/link';
import { ArrowButton } from '../ArrowButton';

interface HeaderProps {
  menu: MenuRecordModel[];
}

export const Header: React.FC<HeaderProps> = ({ menu }) => {
  console.log(menu);

  return (
    <Wrapper>
      <BlockMeny>
        <img src="/static/icon/logo.svg" />
        <Meny>
          {/* {menu.map((item) => {
            <Link href={item.url} key={item.id}>
              <a>{item.label}</a>
            </Link>;
          })} */}
          <Link href={'/'}>
            <a>Продукция</a>
          </Link>
          <Link href={'/'}>
            <a>Услуги</a>
          </Link>
          <Link href={'/'}>
            <a>О компании</a>
          </Link>
          <Link href={'/'}>
            <a>Контакты</a>
          </Link>
        </Meny>
      </BlockMeny>
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
          <img src="/static/icon/phone.svg" />
          <img src="/static/icon/whatsapp.svg" />
          <img src="/static/icon/message.svg" />
        </BlockContact>
      </Content>
    </Wrapper>
  );
};
