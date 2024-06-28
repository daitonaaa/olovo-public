import { PropsWithChildren } from 'react';
import { LayoutOwnProps } from '@/currentTemplate/components/layout/model';
import { Main } from './styled';
import { Header } from '@/currentTemplate/components/Header';
import { Footer } from '@/currentTemplate/components/Footer';
import { Products } from '../Products';
import { About } from '../About';
import { Advantages } from '../Advantages';
import { Partners } from '../Partners';
import ComponentMap from '../Map';

export const PageDefaultLayout = (props: PropsWithChildren<LayoutOwnProps>) => {
  const { children, backgroundColor, pageProps } = props;

  const menuData = pageProps?.pageSettings?.admin?.menu || {};

  return (
    <>
      <Header menu={menuData['TOP_MENU'] || []} />
      <Main style={{ backgroundColor }}>
        <Products />
        <About />
        <Advantages />
        <Partners />
        <ComponentMap />
      </Main>
      <Footer menu={menuData['FOOTER_MENU'] || []} />
    </>
  );
};
