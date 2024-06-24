import styled from 'styled-components';
import { BoxWrapper } from '../../styled';

export const BlockFormWrapper = styled(BoxWrapper)`
  margin-bottom: ${({ theme }) => theme.spaces.l};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spaces.l};
`;

export const TitleWrapper = styled.div`
  display: flex;
`;

export const Chips = styled.div`
  margin-left: 20px;
`;

export const Controls = styled.div`
  .MuiIconButton-root {
    color: ${({ theme }) => theme.palette.accent};

    &.Mui-disabled {
      opacity: 0.3;
    }
  }
`;
