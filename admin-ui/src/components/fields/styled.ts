import styled from 'styled-components';

export const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Error = styled.p`
  position: absolute;
  bottom: -20px;
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.error};
`;
