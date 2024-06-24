import styled, { css } from 'styled-components';
import { BoxWrapper } from '../styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 16px;
`;

const underline = css`
  &::after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 4px;
    left: 0;
    background: ${({ theme }) => theme.palette.primary};
  }
`;

export const Button = styled.div<{ active: boolean }>`
  position: relative;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text};
  height: 32px;
  padding: 0 16px;
  background: ${({ theme }) => theme.palette.background};
  ${props => (props.active ? underline : null)}
  text-transform: uppercase;
`;

export const BoxLinkWrapper = styled(BoxWrapper)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  height: 150px;
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

export const MenuItem = styled.div<{ isDragging: boolean }>`
  background: ${({ theme }) => theme.palette.background};
  min-height: 40px;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spaces.m};
`;

export const MenuSubListContainer = styled.div`
  min-height: 100%;
  min-width: 100%;
  gap: 24px;
`;

export const MenuSubItem = styled.div<{ isDragging: boolean }>`
  background: ${({ theme }) => theme.palette.background};
  min-height: 40px;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  border: 1px solid ${({ theme }) => theme.palette.primaryDark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spaces.m};
`;
