import { ThemeContextUtils } from './context-utils';
import { DeepPartial } from '@/core/types';

export interface StyleThemeTextSize {
  size: string;
  weight: number;
  lineHeight: string;
  isUppercase?: boolean;
}

export interface ThemePalette {
  main: {
    blue: string;
    blueLight: string;
    blueGradient: string;
    brown: string;
    brownLight: string;
    brownGradient: string;
    blueLight2: string;
    blueGray: string;
    brownUltraLight: string;
  };
  text: {
    primary: string;
    secondary: string;
    white: string;
    blue: string;
  };
  system: {
    error: string;
  };
}

export interface StyleTheme {
  palette: ThemePalette;
  textSizes: {
    header1: StyleThemeTextSize;
    header2: StyleThemeTextSize;
    header3: StyleThemeTextSize;
    header4: StyleThemeTextSize;
    header5: StyleThemeTextSize;
    body: StyleThemeTextSize;
    bodySmall: StyleThemeTextSize;
    caption: StyleThemeTextSize;
  };
  typography: {
    fontFamily: string;
  };
  screenSizes: {
    minDesktop: number;
    minTablet: number;
    minLargeDesktop: number;
  };
  spaces: {
    xxs: string;
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
  };
  shadow: {
    base: string;
    large: string;
    card: string;
  };
  utils: ThemeContextUtils;
  shape: {
    borderRadius: string;
  };
  animate: {
    base: string;
  };
  __mobilePatch?: Omit<DeepPartial<StyleTheme>, 'screenSizes'>;
}
