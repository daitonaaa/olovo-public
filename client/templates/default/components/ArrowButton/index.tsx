import React from 'react';
import { Block, Title } from './styled';

interface ButtonProps {
  title: string;
}

export const ArrowButton: React.FC<ButtonProps> = ({ title = '' }) => {
  return (
    <Block>
      <Title>{title}</Title>
      <img src="/assets/icon/arrow_button.svg" />
    </Block>
  );
};
