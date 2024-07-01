import { MenuRecordModel } from '@/core/admin/types';
import Link from 'next/link';
import React, { useState } from 'react';
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
import { FeedBackModal } from '../FeedBackModal';

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
  const [showFeedBack, setShowFeedBack] = useState<boolean>(false);

  const handleFeedBack = () => {
    setShowFeedBack(true);
  };
  return (
    <Wrapper>
      <QuestionBlock>
        <Text>
          Вы можете задать ваш вопрос по наличию, сроку изготовления, характеристикам, размерам и
          доставке груза.
        </Text>
        <ArrowButton title="Задать вопрос" onClick={handleFeedBack} />
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
              <a href="tel:88002225285" className="contact__link">
                8 800 222 52 85
              </a>
            </Contact>

            <ContactPayment>
              <span>По вопросам оплаты счетов:</span>
              <a href="tel:83433825285" className="contact-payment__link">
                8 343 382 52 85
              </a>
            </ContactPayment>
          </ContactPhone>
          <Contact>
            <img src="assets/icon/footer_message.svg" />
            <a href="malito:info@ural-olovo.ru" className="contact__link">
              info@ural-olovo.ru
            </a>
          </Contact>
          <Contact>
            <img src="assets/icon/map.svg" />
            <span>620130, Свердловская область, Екатеринбург, Титова 29</span>
          </Contact>
        </ContactBlock>
        <MenuBlock>
          {menuData.map((item) => (
            <Link href={item.url} key={item.id}>
              <a className="menu-block__link">{item.label}</a>
            </Link>
          ))}
        </MenuBlock>
      </FooterBlock>
      <FeedBackModal isShown={showFeedBack} hide={() => setShowFeedBack(false)} />
    </Wrapper>
  );
};
