import styled, { css, ThemedStyledProps, ThemeProps } from 'styled-components';
import { StyleTheme } from '../types';

const makeProp = (name: string, value?: string | number) => (value ? `${name}: ${value};` : '');

interface ExtraProps {
  textAlign?: string;
}

const injectExtraProps = (props: ThemedStyledProps<ExtraProps, StyleTheme>) => `
  ${makeProp('text-align', props.textAlign)}
`;

export const injectTextSizePropsFor = (textSizeKey: keyof StyleTheme['textSizes']) => {
  return ({ theme }: ThemeProps<StyleTheme>) => {
    const props = theme.textSizes[textSizeKey];
    const mobileProps = theme.__mobilePatch?.textSizes && theme.__mobilePatch.textSizes[textSizeKey];

    return css`
      ${makeProp('font-size', props.size)}
      ${makeProp('font-weight', props.weight)}
      ${makeProp('line-height', props.lineHeight)}
      ${() =>
      mobileProps &&
      theme.utils.media.mobile`
        ${makeProp('font-size', mobileProps.size)}
        ${makeProp('font-weight', mobileProps.weight)}
        ${makeProp('line-height', mobileProps.lineHeight)}
      `}
    `;
  };
};

export const Text = {
  Header1: styled.h1<ExtraProps>`
    ${injectTextSizePropsFor('header1')}
    ${injectExtraProps}
  `,
  Header2: styled.h2<ExtraProps>`
    ${injectTextSizePropsFor('header2')}
    ${injectExtraProps}
  `,
  Header3: styled.h3<ExtraProps>`
    ${injectTextSizePropsFor('header3')}
    ${injectExtraProps}
  `,
  Header4: styled.h4<ExtraProps>`
    ${injectTextSizePropsFor('header4')}
    ${injectExtraProps}
  `,
  Header5: styled.h5<ExtraProps>`
    ${injectTextSizePropsFor('header5')}
    ${injectExtraProps}
  `,
  Body: styled.span<ExtraProps>`
    ${injectTextSizePropsFor('body')}
    ${injectExtraProps}
  `,
  BodySmall: styled.span<ExtraProps>`
    ${injectTextSizePropsFor('bodySmall')}
    ${injectExtraProps}
  `,
  Caption: styled.span<ExtraProps>`
    ${injectTextSizePropsFor('caption')}
    ${injectExtraProps}
  `,
  Error: styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.palette.system.error};
  `,
  Secondary: styled.span`
    color: ${({ theme }) => theme.palette.text.secondary};
  `,
};
