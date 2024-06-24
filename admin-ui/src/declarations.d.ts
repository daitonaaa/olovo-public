import { StyleTheme } from './theme/types';
import { ThemeContextUtils } from './theme/context-utils';

declare module 'styled-components' {
  interface DefaultTheme extends StyleTheme {
    utils: ThemeContextUtils;
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    customParams?: {
      isAuthRoute?: boolean;
    };
  }
}
