import { StyleTheme } from '@/core/theme-utils/types';

const templateTheme: Omit<StyleTheme, 'utils'> = {
  palette: {
    main: {
      darkGrey: '#1E1E1E',
      grey: '#4F4F4F',
      greyLight: '#353535',
      whiteGrey: '#E0E0E0',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#BDBDBD',
    },
    system: {
      error: '#D8514B',
    },
  },
  typography: {
    fontFamily: 'Manrope',
  },
  textSizes: {
    header1: {
      weight: 800,
      lineHeight: '80px',
      size: '60px',
    },
    header2: {
      weight: 800,
      lineHeight: '68px',
      size: '48px',
    },
    header3: {
      weight: 800,
      lineHeight: '48px',
      size: '32px',
    },
    header4: {
      weight: 800,
      lineHeight: '32px',
      size: '24px',
    },
    header5: {
      weight: 800,
      lineHeight: '28px',
      size: '18px',
    },
    body: {
      weight: 400,
      lineHeight: '28px',
      size: '18px',
    },
    bodySmall: {
      weight: 400,
      lineHeight: '24px',
      size: '16px',
    },
    caption: {
      weight: 400,
      lineHeight: '20px',
      size: '14px',
    },
    medium: {
      weight: 500,
      lineHeight: '22px',
      size: '16px',
    },
  },
  screenSizes: {
    minDesktop: 1024,
    minLargeDesktop: 768,
    minTablet: 768,
  },
  spaces: {
    xxs: '8px',
    xs: '12px',
    s: '16px',
    m: '24px',
    l: '32px',
    xl: '48px',
  },
  shadow: {
    base: '0px 6px 24px rgba(4, 90, 120, 0.1);',
    large: '0px 6px 24px rgba(4, 90, 120, 0.1);',
    card: '0px 6px 24px rgba(4, 90, 120, 0.1);',
  },
  shape: {
    borderRadius: '10px',
  },
  animate: {
    base: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },

  zIndex: {
    menu: 2,
  },
};

export default templateTheme;
