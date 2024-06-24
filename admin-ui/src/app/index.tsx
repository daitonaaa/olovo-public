import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import { ThemeProvider } from '../theme/provider';
import { PageLayout } from '../components/layouts/PageLayout';
import { QueryClientProvider, QueryClient } from 'react-query';
import { NotificationsProvider } from '../providers/notifications';
import { ConfirmDialogProvider } from '../providers/confirm-dialog';
import { AppEventsConsumer } from '../events/consumer';
import { isAuth } from '../http/service';
import { FileUploaderProvider } from '../providers/file-uploader';

export const queryClient = new QueryClient();

const PagesList = React.lazy(async () => import('../pages/pages'));
const DetailPage = React.lazy(async () => import('../pages/detail-page'));
const ComponentsList = React.lazy(async () => import('../pages/components'));
const CreatePage = React.lazy(async () => import('../pages/createPage'));
const EditComponentPage = React.lazy(async () => import('../pages/editComponent'));
const NotFound = React.lazy(async () => import('../pages/not-found'));
const CreateComponent = React.lazy(async () => import('../pages/createComponent'));
const SettingsPage = React.lazy(async () => import('../pages/settings-page'));
const LoginPage = React.lazy(async () => import('../pages/login'));
const MenuPage = React.lazy(async () => import('../pages/menu'));
const CrudListPage = React.lazy(async () => import('../pages/listCrud'));
const CrudEditPage = React.lazy(async () => import('../pages/editCrud'));
const CrudCreatePage = React.lazy(async () => import('../pages/createCrud'));

const Fallback = () => {
  return <PageLayout isNavsHidden={!isAuth()} title=""></PageLayout>;
};

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ConfirmDialogProvider>
        <NotificationsProvider>
          <AppEventsConsumer />
          <FileUploaderProvider>
            <Suspense fallback={<Fallback />}>
              {isAuth() ? (
                <Switch>
                  <Route exact path={routes.home} component={PagesList} />
                  <Route exact path={routes.components} component={ComponentsList} />
                  <Route exact path={routes.createPage} component={CreatePage} />
                  <Route exact path={routes.detailPageById} component={DetailPage} />
                  <Route exact path={routes.editComponent} component={EditComponentPage} />
                  <Route exact path={routes.createComponent} component={CreateComponent} />
                  <Route exact path={routes.settings} component={SettingsPage} />
                  <Route exact path={routes.menu} component={MenuPage} />
                  <Route exact path={routes.crudCreateItem} component={CrudCreatePage} />
                  <Route exact path={routes.crudList} component={CrudListPage} />
                  <Route path={routes.crudEdit} component={CrudEditPage} />
                </Switch>
              ) : (
                <Switch>
                  <Route exact path={routes.login} component={LoginPage} />
                  <Route path="*" component={NotFound} />
                </Switch>
              )}
            </Suspense>
          </FileUploaderProvider>
        </NotificationsProvider>
      </ConfirmDialogProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export const App = () => {
  return <AppContent />;
};
