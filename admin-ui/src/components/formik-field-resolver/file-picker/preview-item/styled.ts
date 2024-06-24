import styled, { css } from 'styled-components';

export const DeleteImage = styled.span`
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
  transition: 0.3s ${({ theme }) => theme.animate.base};
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 15;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.palette.primary};
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.extraLight};
    left: 50%;
    top: 50%;
  }
  &:hover {
    opacity: 1;
  }
  &::before {
    transform: translate(calc(-50%), calc(-50%)) rotate(45deg);
  }
  &::after {
    transform: translate(calc(-50%), calc(-50%)) rotate(-45deg);
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    ${DeleteImage} {
      opacity: 0.5;
      transform: scale(1);
      pointer-events: initial;
    }
  }
`;

export const ImageHolder = styled.div<{ isVisible?: boolean }>`
  position: relative;
  padding-top: 100%;
  width: 100%;
  transition: opacity 0.3s ${({ theme }) => theme.animate.base};
  opacity: 0;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  overflow: hidden;

  &[data-image-load='true'] {
    opacity: 1;
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
    `}

  &:has(p) {
    border: 1px solid rgb(204, 204, 204);
  }
  & img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  & p {
    margin: 0;
    font-size: 24px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const FileName = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  padding-left: 7px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin: 0;
  display: block;
  width: 100%;
  max-height: 50px;
  min-height: 50px;
  color: ${({ theme }) => theme.palette.primaryDark};
`;

export const Filetype = styled.div`
  padding: 3px 6px;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  background: ${({ theme }) => theme.palette.accent};
  position: absolute;
  right: 12px;
  top: 170px;
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadow.small};
`;
