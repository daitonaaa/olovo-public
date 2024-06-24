import { MenuClientModel } from '@/core/admin/types';

export interface LayoutOwnProps {
  title: string;
  backgroundColor?: string;
  pageProps: {
    pageSettings: {
      admin: {
        menu: MenuClientModel[];
      };
    };
  };
}
