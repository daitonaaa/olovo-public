import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ progress: number }>`
  position: relative;

  .spinner {
    margin: auto;
    overflow: hidden;
  }

  .container {
    left: 50%;
    top: 50%;
    overflow: hidden;
    width: 50px;
    height: 80px;
    transition: transform 1s ${({ theme }) => theme.animate.base};

    ${({ progress }) => {
      if (progress < 40) {
        return css`
          transform: translate(10%, 50%);
        `;
      }

      if (progress > 30 && progress < 50) {
        return css`
          transform: translate(0, 30%);
        `;
      }

      return css`
        transform: translate(0, ${100 - progress}%);
      `;
    }}
  }

  .wave {
    width: 100px;
    height: 100px;
    background: ${({ theme }) => theme.palette.accent};
    border-radius: 45%;
    transform-style: preserve-3d;
    transform-origin: center;
    animation: rotate 2.5s linear infinite;
    margin-top: 15px;
    margin-left: -50%;
    // mix-blend-mode: multiply;
    position: absolute;

    &:nth-of-type(1) {
      margin-top: 20px;
      animation-duration: 2.1s;
      animation-direction: reverse;
      z-index: 1;
    }

    &:nth-of-type(2) {
      animation-duration: 2.5s;
      border-radius: 41%;
      animation-direction: normal;
      background: #d49b539c;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0) translate(0, 0);
    }
    45% {
      transform: rotate(90deg) translate(15px, 15px);
    }
    100% {
      transform: rotate(180deg) translate(0, 0);
    }
  }
`;
