import React from 'react';
import { Wrapper } from './styled';

interface Props {
  value: string;
}

export const MetaField = ({ value }: Props) => {
  if (!value) {
    return null;
  }
  return <Wrapper>{value}</Wrapper>;
};
