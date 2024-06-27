import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0px 60px 80px;
  box-sizing: border-box;
  max-width: 1440px;
`;

export const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const Text = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 43.71px;
  letter-spacing: 0.02em;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  padding-top: 47px;
  border-top: 1px solid #4f4f4f;
  position: relative;
`;

export const BlockPartners = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  background-color: rgba(7, 7, 7, 0.6);
  padding: 30px 21px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1178px;
  position: absolute;
  top: calc(106px + 50px);
  left: calc(100% - 1250px);
  z-index: 99;
`;
