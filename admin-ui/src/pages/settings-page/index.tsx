import { PageLayout } from '../../components/layouts/PageLayout';
import { useNotifications } from '../../providers/notifications';
import SettingsForm, { SettingsFormValues } from '../../components/settings-form';
import { createOrUpdateSettings } from '../../http/endpoints';
import React from 'react';
import { BoxWrapper } from '../../components/styled';
import { useSettings } from '../../http/query-hooks';
import { AnimateWrapper } from '../../components/animate-wrapper';

const SettingsPage = () => {
  const { data: settings } = useSettings();
  const notifications = useNotifications();

  const handleSubmit = async (values: SettingsFormValues) => {
    try {
      await createOrUpdateSettings({
        publicEmail: values.publicEmail,
        systemEmail: values.systemEmail,
        phoneNumber: values.phoneNumber,
        head: values.head,
        isTechnicalWork: values.isTechnicalWork,
        siteName: values.siteName,
        confidentialityUrl: values.confidentialityUrl,
        personalDataUrl: values.personalDataUrl,
      });
      notifications.push({
        severity: 'success',
        text: 'Настройки изменены',
      });

      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageLayout title="Настройки">
      <AnimateWrapper>
        <BoxWrapper>
          <SettingsForm onSubmitForm={handleSubmit} initialValues={settings} />
        </BoxWrapper>
      </AnimateWrapper>
    </PageLayout>
  );
};

export default SettingsPage;
