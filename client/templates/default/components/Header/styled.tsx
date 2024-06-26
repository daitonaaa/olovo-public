import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url('/assets/images/header.png');
  background-position: left top;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  max-height: 800px;
  padding: 23px 60px;
  box-sizing: border-box;
  position: relative;

  &::before {
    content: '';
    background-image: url('/assets/images/shadow_header.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const BlockMeny = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 64px;
  margin-bottom: 169px;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.menu};
`;

export const Menu = styled.div`
  display: flex;
  gap: 60px;
  & > a {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: ${({ theme }) => theme.textSizes.medium.size};
    line-height: ${({ theme }) => theme.textSizes.medium.lineHeight};
    font-weight: ${({ theme }) => theme.textSizes.medium.weight};
    text-decoration: unset;
  }
`;
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 9;
`;

export const BlockText = styled.div`
  width: 100%;
  max-width: 878px;
  display: flex;
  flex-direction: column;
`;

export const BlockContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xl};
  padding: 4px 14px 4px 0;
  border-right: 2px solid #ffffff;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: ${({ theme }) => theme.spaces.l};
`;

export const Desc = styled.div`
  max-width: 749px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 24px;
  font-weight: 400;
  line-height: 32.78px;
  margin-bottom: ${({ theme }) => theme.spaces.l};
`;
