import styled from 'styled-components';

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & button {
    margin-bottom: 8px;
  }
`;

export const Form = styled.form`
  margin: 24px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalTitle = styled.p`
  text-align: center;
  font-weight: ${({ theme }) => theme.textSizes.bodySmall.weight};
  font-size: ${({ theme }) => theme.textSizes.bodySmall.size};
  line-height: ${({ theme }) => theme.textSizes.bodySmall.lineHeight};
`;

export const Text = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 16.39px;
  letter-spacing: 0.02em;
  color: #828282;
`;
