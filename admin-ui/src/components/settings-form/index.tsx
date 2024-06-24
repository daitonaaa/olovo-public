import { Form, FormikProvider, useFormik } from 'formik';
import { TextField } from '../fields/text-field';
import React, { useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { BoxWrapper } from '../styled';
import { FormikSwitch } from '../fields/switch';

export interface SettingsFormValues {
  publicEmail: string;
  systemEmail: string;
  phoneNumber: string;
  head: string;
  isTechnicalWork: boolean;
  siteName: string;
  confidentialityUrl: string;
  personalDataUrl: string;
}

interface Props {
  initialValues?: SettingsFormValues;
  onSubmitForm(values: SettingsFormValues): void;
}

const buildInitialValues = (init?: SettingsFormValues): SettingsFormValues => {
  if (!init) {
    return {
      publicEmail: '',
      systemEmail: '',
      phoneNumber: '',
      head: '',
      isTechnicalWork: false,
      siteName: '',
      confidentialityUrl: '',
      personalDataUrl: '',
    };
  }

  return {
    ...init,
    isTechnicalWork: Boolean(init.isTechnicalWork),
  };
};

export const SettingsForm = ({ initialValues, onSubmitForm }: Props) => {
  const formik = useFormik<SettingsFormValues>({
    onSubmit: async values => {
      onSubmitForm(values);
    },
    initialValues: buildInitialValues(initialValues),
  });

  useEffect(() => {
    if (initialValues) formik.setValues(buildInitialValues(initialValues));
  }, [initialValues]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <br />
        <TextField fullWidth label="Публичный email" name="publicEmail" />
        <br />
        <TextField fullWidth label="Системный email" name="systemEmail" />
        <Typography color="secondary">
          На данный email будут отправляться все формы с сайта а так же критические ошибки сервера. Вы можете ввести
          несколько ящиков через запятую
        </Typography>
        <br />
        <TextField fullWidth label="Номер телефона" name="phoneNumber" />
        <Typography color="secondary">
          Вы можете ввести несколько номеров через запятую, самый первый номер будет главным
        </Typography>
        <br />
        <TextField fullWidth multiline={true} minRows={3} label="Код в head" name="head" />
        <br />
        <BoxWrapper>
          <FormikSwitch label="Технические работы" name="isTechnicalWork" />
        </BoxWrapper>
        <br />
        <TextField fullWidth label="Название сайта" name="siteName" />
        <br />
        <TextField fullWidth label="URL на политику конфиденциальности" name="confidentialityUrl" />
        <br />
        <TextField fullWidth label="URL на согласие на обработку ПД" name="personalDataUrl" />
        <br />
        <br />
        <Button color="primary" variant="contained" type="submit" size="large">
          Сохранить
        </Button>
      </Form>
    </FormikProvider>
  );
};

export default SettingsForm;
