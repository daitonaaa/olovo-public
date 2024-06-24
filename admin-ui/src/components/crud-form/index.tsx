import React, { useEffect, useState } from 'react';
import { CrudConfig } from '../../http/models/view-models';
import { FormikProvider, useFormik, Form } from 'formik';
import { FormikFieldResolver } from '../formik-field-resolver';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import { rusTextToLat } from '../../utils';
import { nanoid } from 'nanoid';
import { MarginWrapper } from '../../theme/wrappers';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes';
import { ControlPointDuplicateOutlined } from '@material-ui/icons';
import { useConfirmDialog } from '../../providers/confirm-dialog';

interface Props {
  crudConfig: CrudConfig;
  initialValues?: any;

  onCopy?(formValues: any): void;
  onDelete?(slug: any): void;
  onFormSubmit(values: any): Promise<void>;
}

const createValidateSchema = (crudConfig: CrudConfig) => {
  const requiredFields = Object.keys(crudConfig.formParams).filter(
    fieldName => crudConfig.formParams[fieldName].required
  );

  if (requiredFields.length) {
    const yupObj: any = {};
    requiredFields.forEach(field => (yupObj[field] = Yup.mixed().required()));
    return Yup.object(yupObj);
  }
};

export const EditCrudForm = ({ crudConfig, initialValues, onFormSubmit, onCopy, onDelete }: Props) => {
  const confirmDialog = useConfirmDialog();
  const [isLoad, setIsLoad] = useState(false);
  const history = useHistory();
  const [hash, setHash] = useState(nanoid(5));
  const formik = useFormik<{ [key: string]: any }>({
    initialValues: initialValues || {},
    validationSchema: createValidateSchema(crudConfig),
    validateOnChange: false,
    validateOnMount: false,
    async onSubmit(values) {
      try {
        setIsLoad(true);
        await onFormSubmit(values);
      } finally {
        setIsLoad(false);
      }
    },
  });

  useEffect(() => {
    if (initialValues) {
      formik.setValues(initialValues);
    }
  }, []);

  const handleFieldBlur = (fieldName: string) => {
    if (crudConfig.slug.type !== 'string') {
      return;
    }

    if (fieldName === crudConfig.entityLabelField && !formik.values[crudConfig.slug.field]) {
      const label = formik.getFieldMeta(fieldName).value;
      if (label.length > 5) {
        formik.setFieldValue(crudConfig.slug.field, rusTextToLat(label));
        setHash(nanoid(6));
      }
    }
  };

  const handleCopy = () => {
    confirmDialog.show({
      dialogText: `Вы хотите создать копию ${initialValues[crudConfig.entityLabelField]}?`,
      onApply() {
        onCopy && onCopy(formik.values);
      },
    });
  };

  const handleDelete = () => {
    confirmDialog.show({
      dialogText: `Вы хотите удалить ${initialValues[crudConfig.entityLabelField]}?`,
      onApply() {
        onDelete && onDelete(formik.values[crudConfig.slug.field]);
      },
    });
  };

  return (
    <FormikProvider value={formik}>
      <Form key={hash}>
        {Object.keys(crudConfig.formParams).map(field => {
          const param = crudConfig.formParams[field];
          return (
            <FormikFieldResolver
              key={field}
              onBlur={handleFieldBlur}
              name={field}
              label={param.label}
              fieldType={param.fieldType}
              isMultiple={param.isMultiple}
              allow={param.allow}
              disabled={isLoad || (field === crudConfig.slug.field && Boolean(initialValues?.id))}
            />
          );
        })}
        <br />
        <br />
        <MarginWrapper display="flex">
          <MarginWrapper>
            <Button disabled={isLoad} variant="contained" color="primary" type="submit">
              Сохранить
            </Button>
          </MarginWrapper>
          <MarginWrapper marginLeft="m">
            <Button
              onClick={() => history.push(routes.crudList.replace(':name', crudConfig.name))}
              disabled={isLoad}
              variant="outlined"
            >
              Назад
            </Button>
          </MarginWrapper>
          {onDelete && (
            <MarginWrapper marginLeft="m">
              <Button onClick={handleDelete} disabled={isLoad} variant="outlined">
                Удалить
              </Button>
            </MarginWrapper>
          )}
          {!!initialValues && onCopy && (
            <MarginWrapper display="flex" flex="1" justifyContent="flex-end">
              <Button
                disabled={isLoad}
                variant="outlined"
                onClick={handleCopy}
                startIcon={<ControlPointDuplicateOutlined color="inherit" />}
              >
                Скопировать
              </Button>
            </MarginWrapper>
          )}
        </MarginWrapper>
      </Form>
    </FormikProvider>
  );
};
