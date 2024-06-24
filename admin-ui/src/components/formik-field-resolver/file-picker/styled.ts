import styled, { css } from 'styled-components';
import { createLabelStyle } from '../../../theme/global-styles';

interface Shared {
  isDisabled: boolean;
}

export const CloudWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  flex-direction: column;
  color: ${({ theme }) => theme.palette.info};
  transition: 300ms ${({ theme }) => theme.animate.base};
  background: transparent;
`;

export const CloudsWrapper = styled.div`
  position: absolute;
  height: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
  margin-top: 32px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  background: ${({ theme }) => theme.palette.extraLight};
`;

export const Label = styled.div`
  position: absolute;
  top: -10px;
  left: 14px;
  font-size: 12px;
  ${createLabelStyle}
`;

export const Hint = styled.div`
  margin-top: 36px;
  color: inherit;
`;

export const CloudIcon = styled.div`
  transition: 300ms ${({ theme }) => theme.animate.base};
  opacity: 1;
  transform: translateY(150px) scale(0);
`;

export const CloudIcon2 = styled.div`
  position: absolute;
  opacity: 1;
  transform: translateY(-23px) scale(1);
  transition: 300ms ${({ theme }) => theme.animate.base};

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.info} !important;
  }
`;

const shared = css`
  cursor: pointer;
  transition: 0.2s ${({ theme }) => theme.animate.base};
  border: 2px solid ${({ theme }) => theme.palette.accent};
  color: ${({ theme }) => theme.palette.accent};
  box-shadow: rgb(212 155 83) -1px 1px 6px 0px inset;
`;

export const DropWrapper = styled.div<{ isActive?: boolean } & Shared>`
  height: 80px;
  border: 2px dotted ${({ theme }) => theme.palette.info};
  padding: 8px;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  color: ${({ theme }) => theme.palette.info};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isActive }) =>
    isActive &&
    css`
      cursor: pointer;
      ${shared};
    `}

  ${({ isDisabled }) =>
    !isDisabled &&
    css`
      &:hover {
        ${shared}
      }
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      background: #4140402e;
    `}
`;

export const FilesPreviewWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;
`;

const active = css`
  ${CloudIcon2} {
    transform: translateY(-150px) scale(0);
    opacity: 0;
  }

  ${CloudIcon} {
    transform: translateY(17px) scale(1);
    opacity: 1;

    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.accent} !important;
    }
  }

  ${CloudWrapper} {
    background: rgb(212 155 84 / 8%);
    color: ${({ theme }) => theme.palette.accent};
  }
`;

export const DropzoneWrapper = styled.div<{ isActive: boolean } & Shared>`
  position: relative;
  height: 80px;
  overflow: hidden;
  margin-top: 32px;

  ${({ isActive }) =>
    isActive &&
    css`
      ${active}
    `}

  ${({ isDisabled }) =>
    !isDisabled &&
    css`
      &:hover {
        ${active}
      }
    `}
`;
