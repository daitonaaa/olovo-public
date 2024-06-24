import styled, { css } from 'styled-components';

export const BoxWrapper = styled.div<{ fullHeight?: boolean }>`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  background: ${({ theme }) => theme.palette.primaryDark};
  box-shadow: ${({ theme }) => theme.shadow.base};
  margin-bottom: 2rem;

  ${({ fullHeight }) =>
    fullHeight &&
    css`
      min-height: 100%;
    `}
`;

export const ComponentPickerWrapper = styled.div`
  padding: 1rem;
`;

export const FLexBlock = styled.div`
  display: flex;
  gap: 12px;
`;

export const PlusButtonWrapper = styled.div`
  width: 55px;
  height: 55px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${({ theme }) => theme.palette.primaryDark};
`;
