import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const JsonValidIndicatorWrapper = styled.div<{ isValid: boolean }>`
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 5px;
  border-radius: 4px;
  background: ${({ theme, isValid }) => (isValid ? theme.palette.primary : theme.palette.error)};
  color: #fff;
  font-size: 12px;
`;
