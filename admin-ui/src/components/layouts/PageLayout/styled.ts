import styled, { css } from 'styled-components';

export const PAGE_LAYOUT_BOTTOM_OFFSET = 80;

export const CompanyName = styled.div`
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 14px;
  margin-right: 14px;
  border-right: 2px solid #fff;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${PAGE_LAYOUT_BOTTOM_OFFSET}px;
`;

export const TopMenu = styled.div`
  height: 50px;
  width: 100%;
  background: ${({ theme }) => theme.palette.primary};
`;

export const Menu = styled.div`
  padding-left: ${({ theme }) => theme.spaces.s};
  padding-right: ${({ theme }) => theme.spaces.s};
  display: flex;
  height: 100%;

  @media (min-width: 1200px) {
    padding-left: 0;
    padding-right: 0;
    min-width: 1200px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export const NavsWrapper = styled.div`
  display: inherit;
  height: 100%;
  width: 100%;
`;

export const MenuNav = styled.a<{ isActive: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  color: #fff;
  text-align: center;
  padding-left: ${({ theme }) => theme.spaces.m};
  padding-right: ${({ theme }) => theme.spaces.m};
  position: relative;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      &:after {
        content: '';
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 4px;
        left: 0;
        background: ${theme.palette.background};
      }
    `}
`;

export const BodyWrapper = styled.div`
  padding-left: ${({ theme }) => theme.spaces.s};
  padding-right: ${({ theme }) => theme.spaces.s};
  padding-top: ${({ theme }) => theme.spaces.l};
  transition: 0.5s ${({ theme }) => theme.animate.base};
  opacity: 1;

  @media (min-width: 1200px) {
    padding-left: 0;
    padding-right: 0;
    min-width: 1200px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export const Header = styled.div`
  display: flex;
  min-height: 47px;
  align-items: center;
  justify-content: space-between;
`;

export const ComposedWrapper = styled(MenuNav)`
  cursor: pointer;
`;

export const ComposedDropDown = styled.div`
  position: absolute;
  top: 100%;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${({ theme }) => theme.palette.primary};
`;

export const DropdownItem = styled.div`
  min-height: 40px;
  min-width: 200px;
  display: flex;
  align-items: center;

  border-top: 1px solid #fff5f517;
`;
