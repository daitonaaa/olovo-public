import React from 'react';
import { PageLayout } from '../../components/layouts/PageLayout';
import { useQuery } from 'react-query';
import { getComponentById } from '../../http/endpoints';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import { ComponentForm, ComponentFormValues } from '../../components/component-form';
import { routes } from '../../routes';
import { queryClient } from '../../app';
import { useNotifications } from '../../providers/notifications';
import { useHistory } from 'react-router-dom';
import { createOrUpdateComponent } from '../../http/endpoints';
import { BoxWrapper } from '../../components/styled';
import { AnimateWrapper } from '../../components/animate-wrapper';

const EditComponent = () => {
  const params = useParams<{ id: string }>();
  const notifications = useNotifications();
  const history = useHistory();
  const { data } = useQuery(['get_component_by_id', params.id], () => getComponentById(params.id));

  const handleSubmit = async (values: ComponentFormValues) => {
    await createOrUpdateComponent({
      id: Number(params.id),
      name: values.name,
      label: values.label,
      componentTemplate: values.types,
    });
    notifications.push({
      severity: 'success',
      text: 'Компонент успешно обновлен',
    });
    history.push(routes.components);
    queryClient.removeQueries('get_page');
  };

  if (!data) {
    return (
      <PageLayout title="">
        <CircularProgress />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={data.label}>
      <AnimateWrapper>
        <BoxWrapper>
          <ComponentForm
            onSubmitForm={handleSubmit}
            initialValues={{
              name: data.name,
              label: data.label,
              types: data.componentTemplate.map(t => t.componentType),
            }}
          />
        </BoxWrapper>
      </AnimateWrapper>
    </PageLayout>
  );
};

export default EditComponent;
