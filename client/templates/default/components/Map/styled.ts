import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  border-bottom: 1px solid #4f4f4f;

  width: 100%;
  max-width: 1320px;
`;

export const Text = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 43.71px;
  letter-spacing: 0.02em;
`;

export const BlockMap = styled.div`
  padding-top: 47px;
  width: 100%;
  height: 595px;
`;

export const BlockAdress = styled.div`
  position: absolute;
  width: 100%;
  max-width: 442px;
  background-color: ${({ theme }) => theme.palette.main.greyLight};
  padding: 31px 0 60px 32px;
  z-index: 999;
  top: 145px;
  right: 10%;

  &::before {
    z-index: 1;
    content: '';
    position: absolute;
    inset: 9px;
    border: 1px solid #ffffff66;
  }
`;

export const TextTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spaces.l};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.l};
  position: relative;
  z-index: 99;
`;
