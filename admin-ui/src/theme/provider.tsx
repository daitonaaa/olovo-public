import React, { useMemo } from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { CssBaseline, StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { muiTheme, theme } from './theme';
import { GlobalStyles } from './global-styles';
import { contextUtilsFactory } from './context-utils';

export const ThemeProvider: React.FC = ({ children }) => {
  const currentTheme = useMemo(
    (): DefaultTheme => ({
      ...theme,
      utils: contextUtilsFactory(theme),
    }),
    []
  );

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <StyledThemeProvider theme={currentTheme}>
          <CssBaseline />
          <GlobalStyles />
          {children}
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};
