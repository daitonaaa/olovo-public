import React, { ReactNode } from 'react';
import { ModalContainer, ModalContent } from './styled';

interface IProps {
  show: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Modal: React.FC<IProps> = ({ show, onClose, children }) => {
  return (
    <ModalContainer
      show={show}
      onClick={e => {
        onClose?.();
      }}
    >
      <ModalContent
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
