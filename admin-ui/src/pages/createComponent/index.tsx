import React from 'react';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ComponentForm, ComponentFormValues } from '../../components/component-form';
import { routes } from '../../routes';
import { queryClient } from '../../app';
import { useNotifications } from '../../providers/notifications';
import { useHistory } from 'react-router-dom';
import { createOrUpdateComponent } from '../../http/endpoints';
import { BoxWrapper } from '../../components/styled';
import { AnimateWrapper } from '../../components/animate-wrapper';

const CreateComponent = () => {
  const notifications = useNotifications();
  const history = useHistory();

  const handleSubmit = async (values: ComponentFormValues) => {
    await createOrUpdateComponent({
      name: values.name,
      label: values.label,
      componentTemplate: values.types,
    });
    notifications.push({
      severity: 'success',
      text: 'Компонент успешно создан',
    });
    history.push(routes.components);
    queryClient.removeQueries('get_page');
  };

  return (
    <PageLayout title="Новый компонент">
      <AnimateWrapper>
        <BoxWrapper>
          <ComponentForm onSubmitForm={handleSubmit} />
        </BoxWrapper>
      </AnimateWrapper>
    </PageLayout>
  );
};

export default CreateComponent;
