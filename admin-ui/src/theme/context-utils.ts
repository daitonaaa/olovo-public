import { css, ThemedCssFunction, DefaultTheme } from 'styled-components';
import { StyleTheme } from './types';

export interface MediaUtils {
  desktop: ThemedCssFunction<DefaultTheme>;
  tablet: ThemedCssFunction<DefaultTheme>;
  mobile: ThemedCssFunction<DefaultTheme>;
  moreThanMobile: ThemedCssFunction<DefaultTheme>;
}

export const mediaUtilsFactory = (desktopSize: number, tabletSize: number): MediaUtils => {
  const pxWrap = (size: number) => `${size}px`;
  return {
    desktop: (...args: [any]) => css`
      @media (min-width: ${pxWrap(desktopSize)}) {
        ${css(...args)};
      }
    `,
    tablet: (...args: [any]) => css`
      @media (min-width: ${pxWrap(tabletSize)}) and (max-width: ${pxWrap(desktopSize - 1)}) {
        ${css(...args)};
      }
    `,
    mobile: (...args: [any]) => css`
      @media (max-width: ${pxWrap(tabletSize - 1)}) {
        ${css(...args)};
      }
    `,
    moreThanMobile: (...args: [any]) => css`
      @media (min-width: ${pxWrap(tabletSize)}) {
        ${css(...args)};
      }
    `,
  };
};

export interface ThemeContextUtils {
  media: MediaUtils;
}

export const contextUtilsFactory = (theme: StyleTheme): ThemeContextUtils => {
  return {
    media: mediaUtilsFactory(theme.screenSizes.minDesktop, theme.screenSizes.minTablet),
  };
};
