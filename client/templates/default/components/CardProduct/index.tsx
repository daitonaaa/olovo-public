import React from 'react';
import { Block, Title } from './styled';
import Link from 'next/link';

interface CardProductProps {
  item: any;
}

export const CardProduct: React.FC<CardProductProps> = ({ item }) => {
  return (
    <Link href={`${item.id}`}>
      <Block>
        <Title>{item.label}</Title>
        <img src={item.img} className="block__img" />
        <img src="/assets/icon/enter_icon.svg" className="block__icon" />
      </Block>
    </Link>
  );
};
