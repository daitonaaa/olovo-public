import { createTheme } from '@material-ui/core/styles';
import { StyleTheme } from './types';

export const theme: StyleTheme = {
  palette: {
    primary: '#0096CB',
    primaryDark: '#525151',
    light: '#D6CDA4',
    accent: '#D49B54',
    extraLight: '#EEF2E6',

    box_bg: '#ECDBBA',

    secondary: '#313131',
    text: '#fff',
    info: '#808080',
    background: '#313131',
    error: '#EC1A33',

    accent2: '#D49B54',
  },
  spaces: {
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
    xxl: '48px',
  },
  screenSizes: {
    minTablet: 768,
    minDesktop: 992,
    minLargeDesktop: 1200,
  },
  shadow: {
    small: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;',
    base: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
    internal: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;',
  },
  shape: {
    borderRadius: '4px',
  },
  animate: {
    base: 'cubic-bezier(.51,.58,.61,.75)',
  },
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.palette.primary,
    },
    secondary: {
      main: theme.palette.secondary,
    },
    info: {
      main: theme.palette.info,
    },
    error: {
      main: theme.palette.error,
    },
    background: {
      default: theme.palette.background,
    },
    text: {
      primary: theme.palette.text,
    },
  },
  shape: {
    borderRadius: +theme.shape.borderRadius.replace('px', ''),
  },
  typography: {
    fontFamily: 'Fira Mono, sans-serif',
  },
});
