import React from 'react';
import { Block, Title } from './styled';

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export const ArrowButton: React.FC<ButtonProps> = ({ title = '', onClick = () => {} }) => {
  return (
    <Block onClick={onClick}>
      <Title>{title}</Title>
      <img src="/assets/icon/arrow_button.svg" />
    </Block>
  );
};
