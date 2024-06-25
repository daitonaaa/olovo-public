import styled from 'styled-components';

// Buttons

export const GeneralButtonCSS = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.text.primary};
  border-radius: 6px;
`;

export const Cursor = styled.div`
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

//Links
