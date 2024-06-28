import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.main.black};
  padding: 58px 60px 85px;
  box-sizing: border-box;
`;

export const QuestionBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const Text = styled.span`
  font-size: 18px;
  font-weight: 700;
  line-height: 24.59px;
  letter-spacing: 0.02em;
`;

export const FooterBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spaces.l};
  border-top: 1px solid #828282;
`;

export const LogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 218px;
`;

export const Logo = styled.div`
  max-width: 126px;
  margin-bottom: 28px;
`;

export const TextDesc = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  color: #bdbdbd;
`;

export const ContactBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export const Contact = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .contact__link {
    color: ${({ theme }) => theme.palette.text.primary};
    text-decoration: unset;
  }
`;

export const ContactPhone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const ContactPayment = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 48px;
  gap: 4px;

  .contact-payment__link {
    color: ${({ theme }) => theme.palette.text.primary};
    text-decoration: unset;
  }

  & > span {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #bdbdbd;
  }
`;

export const MenuBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.l};
  padding-right: 115px;

  .menu-block__link {
    text-decoration: unset;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  }
`;
