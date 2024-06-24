import styled from 'styled-components';
import { BoxWrapper } from '../../components/styled';

export const IndicatorWrapper = styled(BoxWrapper)`
  position: fixed;
  right: 35px;
  bottom: 100px;
  box-shadow: ${({ theme }) => theme.shadow.base};
  border: 1px solid #c2c2c2;
  z-index: 10;
  padding: ${({ theme }) => theme.spaces.m};
  min-width: 350px;
  min-height: 115px;
`;

export const IndicatorContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.div`
  height: 100%;
  margin-left: ${({ theme }) => theme.spaces.l};
  h3 {
    color: ${({ theme }) => theme.palette.accent};
    padding: 0;
    margin: 0;
  }

  .hint {
    margin-top: ${({ theme }) => theme.spaces.s};
    max-width: 240px;
    height: 100%;
    display: block;
    line-height: normal;
  }
`;
