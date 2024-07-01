import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import {
  Overlay,
  ModalBlock,
  Header,
  Content,
  Close,
  DesktopClose,
} from '@/currentTemplate/components/Modal/styled';
import { useClickOutside } from '@/core/shared/hooks/use-outside-click';
import { useGlobalEscapeKey } from '@/core/shared/hooks/use-global-escape-key';

interface ModalProps {
  isShown: boolean;
  hide: () => void;
  title: string;
}

export const Modal = ({ isShown, hide, title, children }: PropsWithChildren<ModalProps>) => {
  const modalRef = useClickOutside<HTMLDivElement>(hide);
  useGlobalEscapeKey(() => hide());

  const modalContent = (
    <Overlay>
      <Close onClick={hide}>{/* <img src="/static/icons/close-icon.svg" /> */}</Close>
      <ModalBlock ref={modalRef}>
        <DesktopClose onClick={hide}>
          <img src="/assets/icon/modal-close.svg" />
        </DesktopClose>
        <Header>{title}</Header>
        <Content>{children}</Content>
      </ModalBlock>
    </Overlay>
  );

  return isShown ? ReactDOM.createPortal(modalContent, document.body) : null;
};
