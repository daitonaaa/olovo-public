import styled from 'styled-components';

export const Overlay = styled.div`
  z-index: 9999;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  ${({ theme }) => theme.utils.media.desktop`
        display: none;
    `}
`;

export const DesktopClose = styled.div`
  display: none;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  ${({ theme }) => theme.utils.media.desktop`
      display: flex;
  `}
`;

export const ModalBlock = styled.div`
  z-index: 1;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.main.greyLight};
  max-width: 600px;
  padding: 40px 39px;
  width: calc(100% - 36px);
  position: relative;
  box-shadow: 0 6px 24px rgba(4, 90, 120, 0.1);

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    inset: 9px;
    border: 1px solid #ffffff66;
  }
`;

export const Header = styled.h3`
  white-space: pre-line;
  text-align: center;
  z-index: 2;
  margin-bottom: 14px;
  font-size: 32px;
  font-weight: 700;
  line-height: 43.71px;
  letter-spacing: 0.02em;
`;

export const Content = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  padding: 2px;

  ${({ theme }) => theme.utils.media.desktop`
    max-height: 578px;
  `}
`;

export const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  text-align: center;
`;
