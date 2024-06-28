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
export const ListProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 200px);
  grid-column-gap: 21px;
  grid-row-gap: 25px;
  padding-top: 47px;
  border-top: 1px solid #4f4f4f;
`;
