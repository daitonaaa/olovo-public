import React from 'react';
import Link from 'next/link';
import { ArrowButton } from '../ArrowButton';
import { Cursor } from '@/currentTemplate/theme/components';
import { ListProducts, TitleBlock, Wrapper, Text } from './styled';
import { CardProduct } from '../CardProduct';

const productsData = [
  { label: 'Баббит', id: 1, size: true, img: 'assets/images/product_1.png' },
  { label: 'Цинк', id: 2, size: true, img: 'assets/images/product_2.png' },
  { label: 'Баббит', id: 3, img: 'assets/images/product_1.png' },
  { label: 'Цинк', id: 4, img: 'assets/images/product_2.png' },
  { label: 'Баббит', id: 5, img: 'assets/images/product_1.png' },
  { label: 'Цинк', id: 6, img: 'assets/images/product_2.png' },
  { label: 'Баббит', id: 7, img: 'assets/images/product_1.png' },
  { label: 'Цинк', id: 8, img: 'assets/images/product_2.png' },
  { label: 'Баббит', id: 9, img: 'assets/images/product_1.png' },
  { label: 'Цинк', id: 10, img: 'assets/images/product_2.png' },
];

export const Products: React.FC = () => {
  return (
    <Wrapper>
      <TitleBlock>
        <Text>Продукция</Text>
        <ArrowButton title="Вся продукция" />
      </TitleBlock>

      <ListProducts>
        {productsData.map((item) => (
          <CardProduct item={item} />
        ))}
      </ListProducts>
    </Wrapper>
  );
};
