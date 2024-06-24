import React, { PropsWithChildren, useMemo } from 'react'
import { ThemeProvider as ScThemeProvider } from 'styled-components'
import GlobalStyle from '../global-styles'
import { contextUtilsFactory } from '../context-utils'
import { StyleTheme } from '@/core/theme-utils/types'
import templateTheme from '@/currentTemplate/theme/index'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const currentTheme = useMemo(() => {
    return templateTheme
  }, [])

  const theme: StyleTheme = {
    ...templateTheme,
    utils: contextUtilsFactory(currentTheme),
  }

  return (
    <ScThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ScThemeProvider>
  )
}
