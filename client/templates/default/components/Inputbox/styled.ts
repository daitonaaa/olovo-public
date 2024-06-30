import styled, { css } from 'styled-components';

const Font = css`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

export const Box = styled.div`
  position: relative;
`;

export const InnerBox = styled.div`
  position: relative;
  overflow: hidden;
  &.invalid {
    &::before {
      content: '';
      z-index: 1;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.palette.system.error};
    }
    label {
      color: ${({ theme }) => theme.palette.system.error};
    }
  }
`;

export const Input = styled.input<{ textColor: string; caretColor: string }>`
  box-shadow: inset 0 1px 4px rgba(0, 114, 156, 0.06);
  background-color: #070707;
  box-sizing: border-box;
  position: relative;
  height: 48px;
  width: 100%;
  padding: 18px 16px 6px;
  outline: none;
  border: 0;
  color: ${(props) => props.textColor};
  caret-color: ${(props) => props.caretColor};
  ${Font}
  &:focus {
    /* border: 1px solid ${({ theme }) => theme.palette.main}; */
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: transparent !important;
    color: ${({ theme }) => theme.palette.text.primary} !important;
    transition: all 5000s ease-in-out 0s;
  }
  &:not(:placeholder-shown) ~ label,
  &:focus ~ label {
    top: 6px;
    font-size: 10px;
    line-height: 12px;
  }
`;

export const InputTextarea = styled.textarea<{ textColor: string; caretColor: string }>`
  box-shadow: inset 0 1px 4px rgba(0, 114, 156, 0.06);
  background-color: #070707;
  box-sizing: border-box;
  position: relative;
  height: 48px;
  width: 100%;
  padding: 18px 16px 6px;
  outline: none;
  border: 0;
  color: ${(props) => props.textColor};
  caret-color: ${(props) => props.caretColor};
  ${Font}
  &:focus {
    /* border: 1px solid ${({ theme }) => theme.palette.main}; */
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: transparent !important;
    color: ${({ theme }) => theme.palette.text.primary} !important;
    transition: all 5000s ease-in-out 0s;
  }
  &:not(:placeholder-shown) ~ label,
  &:focus ~ label {
    top: 6px;
    font-size: 10px;
    line-height: 12px;
  }
`;

export const Error = styled.p`
  margin-left: 16px;
  font-size: ${({ theme }) => theme.textSizes.caption.size};
  font-weight: ${({ theme }) => theme.textSizes.caption.weight};
  line-height: ${({ theme }) => theme.textSizes.caption.lineHeight};
  color: ${({ theme }) => theme.palette.system.error};
`;

export const Label = styled.label`
  position: absolute;
  transition: all 0.15s linear;
  top: 12px;
  left: 16px;
  color: ${({ theme }) => theme.palette.text.secondary};
  ${Font}
`;
