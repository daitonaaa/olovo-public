import { MenuRecordModel } from '@/core/admin/types';
import Link from 'next/link';
import React from 'react';
import {
  Wrapper,
  LogoBlock,
  ContactBlock,
  MenuBlock,
  FooterBlock,
  QuestionBlock,
  Text,
  TextDesc,
  Logo,
  Contact,
  ContactPayment,
  ContactPhone,
} from './styled';
import { ArrowButton } from '../ArrowButton';

interface FooterProps {
  menu: MenuRecordModel[];
}

const menuData = [
  { label: 'Продукция', url: 'products', items: [], id: 1, order: 1 },
  { label: 'Услуги', url: 'services', items: [], id: 2, order: 2 },
  { label: 'Прайс', url: 'prise', items: [], id: 3, order: 3 },
  { label: 'О компании', url: 'about', items: [], id: 4, order: 4 },
  { label: 'Контакты', url: 'contact', items: [], id: 5, order: 5 },
];

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Wrapper>
      <QuestionBlock>
        <Text>
          Вы можете задать ваш вопрос по наличию, сроку изготовления, характеристикам, размерам и
          доставке груза.
        </Text>
        <ArrowButton title="Задать вопрос" />
      </QuestionBlock>
      <FooterBlock>
        <LogoBlock>
          <Logo>
            <img src="/assets/icon/logo.svg" />
          </Logo>
          <TextDesc>© 2023 ООО "Урал-Олово" все права защищены</TextDesc>
        </LogoBlock>
        <ContactBlock>
          <ContactPhone>
            <Contact>
              <img src="assets/icon/footer_phone.svg" />
              <a href="tel:88002225285">8 800 222 52 85</a>
            </Contact>

            <ContactPayment>
              <span>По вопросам оплаты счетов:</span>
              <a href="tel:83433825285">8 343 382 52 85</a>
            </ContactPayment>
          </ContactPhone>
          <Contact>
            <img src="assets/icon/footer_message.svg" />
            <a href="malito:info@ural-olovo.ru">info@ural-olovo.ru</a>
          </Contact>
          <Contact>
            <img src="assets/icon/map.svg" />
            <span>620130, Свердловская область, Екатеринбург, Титова 29</span>
          </Contact>
        </ContactBlock>
        <MenuBlock>
          {menuData.map((item) => (
            <Link href={item.url} key={item.id}>
              <a>{item.label}</a>
            </Link>
          ))}
        </MenuBlock>
      </FooterBlock>
    </Wrapper>
  );
};
