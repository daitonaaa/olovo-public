import { FieldType } from '../../http/models/api';
import { SelectField, SelectProps } from '../fields/select';
import { componentTypeMeta } from '../../http/models/componentTypeMeta';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { TextField } from '../fields/text-field';

export interface ComponentFormValues {
  types: FieldType[];
  name: string;
  label: string;
}

const componentTypeOptions: SelectProps['options'] = Object.keys(componentTypeMeta).map(key => ({
  label: (componentTypeMeta as any)[key].title,
  value: Number(key),
}));

interface Props {
  initialValues?: ComponentFormValues;
  onSubmitForm(values: ComponentFormValues): void;
}

export const ComponentForm = ({ initialValues, onSubmitForm }: Props) => {
  const formik = useFormik<ComponentFormValues>({
    onSubmit: async values => {
      onSubmitForm(values);
    },
    initialValues: initialValues || {
      name: '',
      label: '',
      types: [],
    },
  });

  return (
    <FormikProvider value={formik}>
      {initialValues && initialValues?.types?.length > 0 && (
        <Typography color="secondary">
          <b>
            Обратите внимание, вы не можете убирать ранее добавленные типы из компонента так как они уже используются на
            страницах сайта
          </b>
        </Typography>
      )}
      <br />
      <br />
      <Form>
        <TextField fullWidth label="Наименование" name="label" />
        <br />
        <TextField fullWidth disabled={!!initialValues?.name} label="Системный токен" name="name" />
        <br />
        Типы шаблонов:
        <br />
        <br />
        <div>
          <SelectField
            fullWidth
            disabledOptionsValues={initialValues?.types}
            multiple
            name="types"
            options={componentTypeOptions}
            label="Доступные типы"
          />
        </div>
        <br />
        <br />
        <Button color="primary" variant="contained" type="submit" size="large">
          Сохранить
        </Button>
      </Form>
    </FormikProvider>
  );
};
