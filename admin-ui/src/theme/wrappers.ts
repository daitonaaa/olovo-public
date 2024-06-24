import styled, { ThemedStyledProps, ThemeProps } from 'styled-components';
import { Color, StyleTheme } from './types';

type Space = keyof StyleTheme['spaces'] | string;

interface ExtraProps {
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  flex?: string;
}

const makeProp = (name: string, value?: string | number) => (value ? `${name}: ${value};` : '');

const injectExtraProps = (props: ThemedStyledProps<ExtraProps, StyleTheme>) => `
  ${makeProp('display', props.display)}
  ${makeProp('align-items', props.alignItems)}
  ${makeProp('justify-content', props.justifyContent)}
  ${makeProp('flex-direction', props.flexDirection)}
  ${makeProp('flex', props.flex)}
`;

const makeSpace = (theme: StyleTheme, cssName: string, value?: string): string => {
  if (!value) {
    return '';
  }
  const spaces = theme.spaces as unknown as Record<string, string>;
  return `${cssName}: ${value in spaces ? spaces[value] : value};`;
};

export interface MarginProps extends ExtraProps {
  margin?: Space;
  marginX?: Space;
  marginY?: Space;
  marginLeft?: Space;
  marginRight?: Space;
  marginTop?: Space;
  marginBottom?: Space;
  color?: any;
}

const injectMargins = (props: ThemedStyledProps<MarginProps, StyleTheme>) => `
  ${makeSpace(props.theme, 'margin', props.margin)}
  ${makeSpace(props.theme, 'margin-left', props.marginX)}
  ${makeSpace(props.theme, 'margin-right', props.marginX)}
  ${makeSpace(props.theme, 'margin-top', props.marginY)}
  ${makeSpace(props.theme, 'margin-bottom', props.marginY)}
  ${makeSpace(props.theme, 'margin-left', props.marginLeft)}
  ${makeSpace(props.theme, 'margin-right', props.marginRight)}
  ${makeSpace(props.theme, 'margin-top', props.marginTop)}
  ${makeSpace(props.theme, 'margin-bottom', props.marginBottom)}
`;

export const getColor = (theme: StyleTheme, color?: Color | string): string => {
  if (!color) {
    return '';
  }

  if (color.indexOf('.') < 0) {
    return color;
  }

  const [groupName, colorName] = color.split('.');
  // eslint-disable-next-line
  // @ts-ignore
  return theme.palette[groupName][colorName];
};

export const injectTextColor = ({ theme, color }: ThemeProps<StyleTheme> & { color?: Color }) =>
  `${makeProp('color', getColor(theme, color))}`;

export const MarginWrapper = styled.div<MarginProps>`
  ${injectMargins}
  ${injectExtraProps}
  ${injectTextColor}
`;
