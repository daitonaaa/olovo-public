import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { PageLayout } from '../../components/layouts/PageLayout';

const NotFound = () => {
  return (
    <PageLayout isNavsHidden title="Страница не существует">
      Страница не существует
      <br />
      <Link to={routes.login}>Может стоит авторизоваться</Link>
    </PageLayout>
  );
};

export default NotFound;
