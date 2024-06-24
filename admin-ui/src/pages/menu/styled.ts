import styled from 'styled-components';
import { BoxWrapper } from '../../components/styled';

export const BoxLinkWrapper = styled(BoxWrapper)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  height: 90px;
  overflow: auto;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  gap: '5px';
`;

export const BlockButton = styled.div`
  display: flex;
  gap: 10px;
`;
