import styled from 'styled-components';

export const Block = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spaces.l};
  border: 1px solid #828282;
  position: relative;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  .block__img {
    width: 261px;
    height: 161px;
  }

  &:nth-child(1) {
    grid-area: 1 / 1 / 3 / 2;
    flex-direction: column;

    .block__img {
      width: 100%;
      height: 100%;
    }

    .block__icon {
      position: relative;
      bottom: 0;
    }
  }

  &:nth-child(2) {
    grid-area: 1 / 2 / 3 / 3;
    flex-direction: column;

    .block__img {
      width: 100%;
      height: 100%;
    }

    .block__icon {
      position: relative;
      bottom: 0;
    }
  }

  .block__icon {
    width: 25px;
    height: 28.5px;
    position: absolute;
    bottom: 32px;
  }
`;
export const Title = styled.h4`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 24px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0.02em;
`;
