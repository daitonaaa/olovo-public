import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadow.base};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  max-width: 400px;
  padding: 14px;
`;
