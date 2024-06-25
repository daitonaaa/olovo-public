import styled from 'styled-components';

export const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export const Title = styled.h4`
  color: ${({ theme }) => theme.palette.text.white};
  font-size: 18px;
  font-weight: 700;
  line-height: 24.59px;
  letter-spacing: 0.02em;
`;
