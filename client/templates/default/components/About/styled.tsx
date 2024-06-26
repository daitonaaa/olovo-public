import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 80px 60px;
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
  gap: 24px;
  padding-top: 32px;
  border-top: 1px solid #4f4f4f;
  margin-bottom: 60px;
`;

export const ContentInfo = styled.div`
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const InfoBlock = styled.div`
  background-color: #353535;
  display: flex;
  align-items: center;
  gap: 45px;
  padding: 29px 30px 29px 24px;
  box-sizing: border-box;

  h1 {
    width: 153px;
  }

  .info-block__desc {
    font-size: 24px;
    font-weight: 400;
    line-height: 32.78px;
  }
`;
export const ContentImage = styled.div`
  height: 100%;
  max-height: 464px;
`;
export const BlockText = styled.div`
  display: flex;
  gap: 130px;

  span {
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    color: #e0e0e0;
  }
`;
export const BlockImage = styled.div`
  img {
    width: 100%;
  }
`;
