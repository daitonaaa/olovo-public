import { ThemedCssFunction } from 'styled-components'
import { DefaultTheme, css } from 'styled-components'
import { StyleTheme } from './types'

export interface MediaUtils {
  largeDesktop: ThemedCssFunction<DefaultTheme>
  desktop: ThemedCssFunction<DefaultTheme>
  tablet: ThemedCssFunction<DefaultTheme>
  mobile: ThemedCssFunction<DefaultTheme>
  moreThanMobile: ThemedCssFunction<DefaultTheme>
}

export const mediaUtilsFactory = (
  largeDesktopSize: number,
  desktopSize: number,
  tabletSize: number
): MediaUtils => {
  const pxWrap = (size: number) => `${size}px`
  return {
    largeDesktop: (...args: [any]) => css`
      @media (min-width: ${pxWrap(largeDesktopSize)}) {
        ${css(...args)};
      }
    `,
    desktop: (...args: [any]) => css`
      @media (min-width: ${pxWrap(desktopSize)}) {
        ${css(...args)};
      }
    `,
    tablet: (...args: [any]) => css`
      @media (min-width: ${pxWrap(tabletSize)}) {
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
  }
}

export interface ThemeContextUtils {
  media: MediaUtils
}

export const contextUtilsFactory = (theme: Omit<StyleTheme, 'utils'>): ThemeContextUtils => {
  return {
    media: mediaUtilsFactory(
      theme.screenSizes.minLargeDesktop,
      theme.screenSizes.minDesktop,
      theme.screenSizes.minTablet
    ),
  }
}
