import { PageLayout } from '../../components/layouts/PageLayout';
import { PageFormComponent } from '../../components/page-form';
import { PageForm } from '../../http/models/view-models';
import { PageMetaType, PageRequestApi } from '../../http/models/api';
import { createOrUpdatePage } from '../../http/endpoints';
import { useHistory, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import { useCallback } from 'react';
import { useNotifications } from '../../providers/notifications';
import { queryClient } from '../../app';

export const mapPageFormToApi = (form: PageForm): PageRequestApi => {
  return {
    id: form.settings.id,
    isPublished: form.settings.isPublished,
    isRegional: form.settings.isRegional,
    url: form.settings.url,
    name: form.settings.name,
    isCrud: form.settings.isCrud,
    pageNode: form.nodes.map((node, i) => ({
      id: node.id,
      isWrappedContainer: node.isWrappedContainer,
      name: node.name,
      order: i,
      componentId: node.componentId,
      nodeParam: node.nodeParam.map(param => ({
        componentType: param.componentType,
        id: param.id,
        value: param.value,
      })),
    })),
    pageMeta: [
      {
        value: form.settings.meta.title.value,
        id: form.settings.meta.title.id,
        role: PageMetaType.Title,
      },
      {
        value: form.settings.meta.desc.value,
        id: form.settings.meta.desc.id,
        role: PageMetaType.Description,
      },
      {
        value: form.settings.meta.ogTitle.value,
        id: form.settings.meta.ogTitle.id,
        role: PageMetaType.OgTitle,
      },
      {
        value: form.settings.meta.ogDescription.value,
        id: form.settings.meta.ogDescription.id,
        role: PageMetaType.OgDesc,
      },
      {
        value: form.settings.meta.ogImageSource.value,
        id: form.settings.meta.ogImageSource.id,
        role: PageMetaType.OgImageSource,
      },
    ],
  };
};

const CreatePage = () => {
  const history = useHistory();
  const notification = useNotifications();
  const location = useLocation<{ form: PageForm }>();
  const createPage = useCallback(
    async (values: PageForm) => {
      await createOrUpdatePage(mapPageFormToApi(values));
      notification.push({
        severity: 'success',
        text: `Страница по адресу ${values.settings.url} успешно создана`,
      });
      queryClient.removeQueries('get_page');
      history.push(routes.home);
    },
    [history]
  );

  return (
    <PageLayout title="Новая страница">
      <PageFormComponent onSubmit={createPage} initialValues={location.state?.form} />
    </PageLayout>
  );
};

export default CreatePage;
