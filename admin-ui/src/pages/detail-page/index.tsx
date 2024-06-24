import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { PageLayout } from '../../components/layouts/PageLayout';
import { PageFormComponent } from '../../components/page-form';
import { PageForm } from '../../http/models/view-models';
import { useQuery } from 'react-query';
import { createOrUpdatePage, deletePage, getPageById } from '../../http/endpoints';
import { createSiteUrlByPath, requireNotNull } from '../../utils';
import { PageNodeFormItem } from '../../components/page-form/factory';
import { mapPageFormToApi } from '../createPage';
import { PageMetaType } from '../../http/models/api';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes';
import { useConfirmDialog } from '../../providers/confirm-dialog';
import { Button } from '@material-ui/core';
import { queryClient } from '../../app';
import { AnimateWrapper } from '../../components/animate-wrapper';
import { RemoveRedEye } from '@material-ui/icons';

const DetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory<{ form: PageForm }>();
  const confirmDialog = useConfirmDialog();
  const { data: currentPage } = useQuery(
    ['get_page', params.id],
    () => getPageById(requireNotNull(params.id, 'Page id required')),
    {
      staleTime: Infinity,
    }
  );

  const [isPublished, setPublish] = useState(Boolean(currentPage?.isPublished));
  useEffect(() => {
    if (currentPage) {
      setPublish(Boolean(currentPage?.isPublished));
    }
  }, [currentPage]);

  const locateToSitePage = () => window.open(createSiteUrlByPath(requireNotNull(currentPage?.url)), '_blank');

  const updatePage = async (values: PageForm) => {
    await createOrUpdatePage(mapPageFormToApi(values));
    queryClient.removeQueries('get_page');
    window.location.reload();
  };

  const formValues = useMemo((): PageForm | undefined => {
    if (!currentPage) {
      return;
    }

    const getFormMeta = (role: PageMetaType) => {
      const meta = currentPage.pageMeta.find(m => m.role === role);
      return meta || { value: '' };
    };

    const values: PageForm = {
      settings: {
        isCrud: currentPage.isCrud,
        lastChangedDate: currentPage.dateCreated || currentPage.updatedAt,
        name: currentPage.name,
        url: currentPage.url,
        id: currentPage.id,
        isPublished: currentPage.isPublished,
        isRegional: currentPage.isRegional,
        meta: {
          ogTitle: getFormMeta(PageMetaType.OgTitle),
          title: getFormMeta(PageMetaType.Title),
          desc: getFormMeta(PageMetaType.Description),
          ogDescription: getFormMeta(PageMetaType.OgDesc),
          ogImageSource: getFormMeta(PageMetaType.OgImageSource),
        },
      },
      nodes: [],
    };

    currentPage.pageNode
      .slice()
      .sort((a, b) => a.order - b.order)
      .forEach(node => {
        const formNode = new PageNodeFormItem(node.component.id);
        formNode.name = node.component.name;
        formNode.label = node.component.label;
        formNode.id = node.id;
        formNode.isWrappedContainer = node.isWrappedContainer;

        node.nodeParam.forEach(param => {
          formNode.addNodeParam({
            id: param.id,
            componentType: param.componentType,
            value: param.value,
          });
        });

        values.nodes.push(formNode);
      });

    return values;
  }, [currentPage]);

  const handleCopyPage = useCallback((form: PageForm) => {
    const copy: PageForm = JSON.parse(JSON.stringify(form));

    confirmDialog.show({
      dialogText: 'Вы уверены что хотите скопировать страницу и выйти с данного раздела?',
      onApply: () => {
        copy.settings.id = undefined;
        copy.settings.name = '';
        copy.settings.url = '';

        copy.settings.meta.title.id = undefined;
        copy.settings.meta.desc.id = undefined;
        copy.settings.meta.ogImageSource.id = undefined;
        copy.settings.meta.ogTitle.id = undefined;
        copy.settings.meta.ogDescription.id = undefined;

        copy.nodes.forEach(item => {
          item.id = undefined;
          item.nodeParam.forEach(node => (node.id = undefined));
        });

        history.push(routes.createPage, { form: copy });
        window.scrollTo({
          top: 0,
        });
      },
    });
  }, []);

  const handleDelete = (id: number) => {
    confirmDialog.show({
      dialogText: 'Вы уверены что хотите удалить страницу?',
      onApply: async () => {
        await deletePage(id);
        history.push(routes.home);
      },
    });
  };

  if (!currentPage) {
    return <PageLayout title="" />;
  }

  return (
    <PageLayout
      title={`${!isPublished ? '(Черновик) ' : ''}${currentPage.name}`}
      headerRightContent={
        currentPage.id && (
          <AnimateWrapper delay={400}>
            <Button startIcon={<RemoveRedEye />} onClick={locateToSitePage} color="primary" variant="outlined">
              Просмотр страницы
            </Button>
          </AnimateWrapper>
        )
      }
    >
      <PageFormComponent
        disabledFields={currentPage.isCrud ? ['settings.url'] : undefined}
        onDelete={currentPage.isCrud ? undefined : handleDelete}
        onSubmit={updatePage}
        initialValues={formValues}
        onCopy={currentPage.isCrud ? undefined : handleCopyPage}
      />
    </PageLayout>
  );
};

export default DetailPage;
