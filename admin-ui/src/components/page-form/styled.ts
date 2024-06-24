import styled, { css } from 'styled-components';
import { Nullable } from '../../types';

export const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 68% 30%;
  grid-gap: ${({ theme }) => theme.spaces.l};
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    &:nth-child(2n) {
      margin-left: 5px;
    }
    &:nth-child(1n) {
      margin-bottom: 5px;
    }
  }
`;

export const AutoStretchMirror = styled.div`
  height: auto;
  display: flex;
  position: absolute;
  z-index: -1;
  bottom: 0;
  top: 0;
  width: 100%;
`;

export const AutoStretchWrapper = styled.div<{ fixedWidth: Nullable<number> }>`
  position: relative;

  ${({ fixedWidth }) =>
    fixedWidth &&
    css`
      position: fixed;
      width: ${fixedWidth}px;
    `}
`;

export const StatusWrapper = styled.div``;

export const EmptyFallback = styled.div`
  opacity: 0.3;
  text-align: center;
  color: ${({ theme }) => theme.palette.extraLight};
  max-width: 270px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spaces.l};

  .MuiSvgIcon-root {
    font-size: 100px;
  }
`;
