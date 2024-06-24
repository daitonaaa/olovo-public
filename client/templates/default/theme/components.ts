import styled from 'styled-components';

// Buttons

export const GeneralButtonCSS = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.text.white};
  border-radius: 6px;
`;

export const BlueButton = styled(GeneralButtonCSS)`
  background: ${({ theme }) => theme.palette.main.blueGradient};
  &:hover {
    background: linear-gradient(
      0deg,
      ${({ theme }) => theme.palette.main.blue} 0%,
      ${({ theme }) => theme.palette.main.blue} 100%
    );
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const BrownButton = styled(GeneralButtonCSS)`
  background: ${({ theme }) => theme.palette.main.brownGradient};
  &:hover {
    background: linear-gradient(
      0deg,
      ${({ theme }) => theme.palette.main.brown} 0%,
      ${({ theme }) => theme.palette.main.brown} 100%
    );
  }
`;

export const WhiteButton = styled(GeneralButtonCSS)`
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.main.blueLight};
  color: ${({ theme }) => theme.palette.main.blueLight};

  :hover {
    opacity: 0.8;
  }
`;

//Links
