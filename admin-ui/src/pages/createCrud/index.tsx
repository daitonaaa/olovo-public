import { PageLayout } from '../../components/layouts/PageLayout';
import React from 'react';
import { BoxWrapper } from '../../components/styled';
import { useSettings } from '../../http/query-hooks';
import { useParams } from 'react-router';
import { EditCrudForm } from '../../components/crud-form';
import { CrudConfig } from '../../http/models/view-models';
import { createCrudApi } from '../../http/endpoints';
import { requireNotNull } from '../../utils';
import { useNotifications } from '../../providers/notifications';
import { useHistory, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import { AnimateWrapper } from '../../components/animate-wrapper';
import { mapFromFormToApi } from '../editCrud';
import { useCrudFiles } from '../../components/crud-form/hooks/use-crud-files';

const createCrud = () => {
  const params = useParams<{ name: string }>();
  const location = useLocation<any>();
  const crudFiles = useCrudFiles();
  const { data: settings, refetch } = useSettings();
  const notifications = useNotifications();
  const history = useHistory();
  const crudConfig: CrudConfig | undefined = settings?.cruds?.find(i => i.name === params.name);

  const handleSubmit = async (values: any) => {
    const [results, uploads] = mapFromFormToApi(values, crudConfig!);
    const { id: instanceId } = await createCrudApi(requireNotNull(crudConfig?.name), results);

    await crudFiles.update(uploads, {
      subjectId: instanceId,
      subjectEntityName: crudConfig?.name,
    });

    await refetch();
    notifications.push({
      severity: 'success',
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      text: `${values[crudConfig?.entityLabelField!]} - Успешно добавлен`,
    });
    history.push(routes.crudList.replace(':name', params.name));
  };

  if (!settings?.cruds || !crudConfig) {
    return <PageLayout title="" />;
  }

  return (
    <PageLayout title={`${crudConfig.label} - Новый элемент`}>
      <AnimateWrapper>
        <BoxWrapper>
          <EditCrudForm initialValues={location.state?.preData} onFormSubmit={handleSubmit} crudConfig={crudConfig} />
        </BoxWrapper>
      </AnimateWrapper>
    </PageLayout>
  );
};

export default createCrud;
