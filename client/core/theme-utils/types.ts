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
    darkGrey: string;
    grey: string;
    greyLight: string;
    whiteGrey: string;
  };
  text: {
    primary: string;
    secondary: string;
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
    medium: StyleThemeTextSize;
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

  zIndex: {
    menu: number;
  };
  __mobilePatch?: Omit<DeepPartial<StyleTheme>, 'screenSizes'>;
}
