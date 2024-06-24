import { PageLayout } from '../../components/layouts/PageLayout';
import { useMenu } from '../../http/query-hooks';
import { MenuProvider } from '../../components/menu/context/menuContextProvider';
import { MenuApp } from '../../components/menu';
import { getMenuDataFromApi } from '../../helpers/getMenuDataFromApi';

const MenuPage = () => {
  const { data: menuData, isLoading, isError } = useMenu();

  if (isError || isLoading || !menuData) {
    return null;
  }

  return (
    <PageLayout title="Меню">
      <MenuProvider initialState={getMenuDataFromApi(menuData)}>
        <MenuApp />
      </MenuProvider>
    </PageLayout>
  );
};

export default MenuPage;
