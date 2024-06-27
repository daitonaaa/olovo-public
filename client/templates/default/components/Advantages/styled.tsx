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
  align-items: center;
  gap: 22px;
`;

export const Block = styled.div<{ background: string }>`
  background-image: url(${(props) => props.background});
  width: 310px;
  height: 320px;
  display: flex;
  flex-direction: column;
  padding: 140px 24px 0px;
  box-sizing: border-box;
  gap: 16px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 24.59px;
  letter-spacing: 0.02em;
`;

export const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 19.12px;
  letter-spacing: 0.02em;
`;
