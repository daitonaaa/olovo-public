import { PageLayout } from '../../components/layouts/PageLayout';
import React, { useMemo } from 'react';
import { BoxWrapper } from '../../components/styled';
import { useSettings } from '../../http/query-hooks';
import { useParams } from 'react-router';
import { EditCrudForm } from '../../components/crud-form';
import { CrudConfig } from '../../http/models/view-models';
import { useQuery } from 'react-query';
import { deleteCrudItem, getCrudItemBySlug, patchCrudBySlug } from '../../http/endpoints';
import { requireNotNull } from '../../utils';
import { useNotifications } from '../../providers/notifications';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes';
import { AnimateWrapper } from '../../components/animate-wrapper';
import { FieldType } from '../../http/models/api';
import { FilePickerMixedFile, FilePickerServerFile } from '../../components/formik-field-resolver/file-picker';
import { Nullable } from '../../types';
import { useCrudFiles } from '../../components/crud-form/hooks/use-crud-files';

const getFileFields = (curCrudConfig: CrudConfig) => {
  return Object.keys(curCrudConfig.formParams).filter(
    key => curCrudConfig.formParams[key].fieldType === FieldType.FilesPicker
  );
};

const eachFilePickerField = <T,>(
  data: any,
  crudConfig: CrudConfig,
  arrayMapTick: (filePickerValue: any, field: string) => T
) => {
  const result = { ...data };
  const uploadFields = getFileFields(crudConfig);

  for (const key in result) {
    if (uploadFields.includes(key) && Array.isArray(result[key])) {
      result[key] = result[key].map((item: any) => arrayMapTick(item, key));
    }
  }

  return result;
};

export const mapFromApiToForm = (data: any, curCrudConfig: CrudConfig) => {
  return eachFilePickerField<FilePickerServerFile>(data, curCrudConfig, (i: any) => ({ type: 'server-file', data: i }));
};

export const mapFromFormToApi = (
  data: any,
  curCrudConfig: CrudConfig
): [results: any, uploads: FilePickerMixedFile[]] => {
  const uploads: FilePickerMixedFile[] = [];
  const results = eachFilePickerField(data, curCrudConfig, item => {
    uploads.push(item);
    return null;
  });

  const fileFields = getFileFields(curCrudConfig);
  for (const field of fileFields) {
    results[field] = undefined;
  }

  return [results, uploads];
};

const EditCrud = () => {
  const params = useParams<{ name: string; slug: string }>();
  const crudFiles = useCrudFiles();
  const { data: settings } = useSettings();
  const notifications = useNotifications();
  const history = useHistory();
  const crudConfig: CrudConfig | undefined = settings?.cruds?.find(i => i.name === params.name);
  const { data: crudData, refetch } = useQuery(
    [`${params.name}_get_single`, params.slug],
    () => getCrudItemBySlug(params.name, params.slug) as any,
    { enabled: !!params.slug }
  );

  const initialValues = useMemo(() => {
    if (!crudData) {
      return null;
    }

    return mapFromApiToForm(crudData, crudConfig!);
  }, [crudConfig, crudData]);

  const handleSubmit = async (values: any) => {
    const [formApiModel, uploads] = mapFromFormToApi(values, crudConfig!);
    await patchCrudBySlug(requireNotNull(crudConfig?.name), params.slug, formApiModel);

    const fileFields = getFileFields(crudConfig!);
    const initialFileFields: Nullable<FilePickerServerFile[]> = !initialValues
      ? null
      : Object.keys(initialValues)
          .filter(key => fileFields.includes(key))
          .flatMap(key => initialValues[key])
          .filter(Boolean);

    if (initialFileFields) {
      await crudFiles.cleanupUnused(uploads, initialFileFields);
    }

    await crudFiles.update(uploads, {
      subjectId: crudData?.id,
      subjectEntityName: crudConfig?.name,
    });

    await refetch();
    notifications.push({
      severity: 'success',
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      text: `${values[crudConfig?.entityLabelField!]} - Обновлено`,
    });

    history.push(routes.crudList.replace(':name', requireNotNull(crudConfig?.name)));
  };

  const handleCopy = async (values: any) => {
    const toCopy = { ...values };
    const config = requireNotNull(crudConfig);
    toCopy[requireNotNull(config.slug.field)] = undefined;
    toCopy.id = undefined;

    // cleanup files
    getFileFields(requireNotNull(crudConfig)).forEach(field => {
      toCopy[field] = null;
    });

    history.push(routes.crudCreateItem.replace(':name', config.name), { preData: toCopy });
  };

  const handleDelete = async (slug: any) => {
    await deleteCrudItem(requireNotNull(crudConfig?.name), slug);
    history.push(routes.crudList.replace(':name', requireNotNull(crudConfig).name));
  };

  if (!settings?.cruds || !crudConfig) {
    return <PageLayout title="" />;
  }

  return (
    <PageLayout title={`${crudConfig.label} - ${crudData?.title || ''}`}>
      <AnimateWrapper>
        <BoxWrapper fullHeight={true}>
          {Boolean(crudData) && (
            <EditCrudForm
              onCopy={handleCopy}
              onFormSubmit={handleSubmit}
              crudConfig={crudConfig}
              initialValues={initialValues}
              onDelete={handleDelete}
            />
          )}
        </BoxWrapper>
      </AnimateWrapper>
    </PageLayout>
  );
};

export default EditCrud;
