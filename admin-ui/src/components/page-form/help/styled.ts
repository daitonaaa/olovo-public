import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Button = styled.div`
  position: fixed;
  top: 100px;
  right: 25px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.primary};
  color: #fff;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spaces.m};
`;

export const Var = styled.div`
  padding: 5px;
  background: #998a8a;
  border-radius: 4px;
  color: #fff;
  margin-right: 10px;
`;
