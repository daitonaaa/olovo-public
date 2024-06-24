import { ExtractKeys } from '../types';

export type Color = ExtractKeys<StylePalette>;

export interface StylePalette {
  primary: string;
  primaryDark: string;
  light: string;
  extraLight: string;
  box_bg: string;
  secondary: string;
  accent: string;
  text: string;
  error: string;
  info: string;
  background: string;
  accent2: string;
}

export interface StyleTheme {
  palette: StylePalette;
  spaces: {
    s: string;
    m: string;
    l: string;
    xl: string;
    xxl: string;
  };
  screenSizes: {
    minTablet: number;
    minDesktop: number;
    minLargeDesktop: number;
  };
  shadow: {
    base: string;
    small: string;
    internal: string;
  };
  animate: {
    base: string;
  };
  shape: {
    borderRadius: string;
  };
}
