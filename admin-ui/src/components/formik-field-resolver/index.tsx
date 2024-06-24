import { FieldType } from '../../http/models/api';
import { useFormikContext } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { Html } from './html';
import { JsonValidIndicatorWrapper, Wrapper } from './styled';
import { TextField } from '../fields/text-field';
import { FilePicker } from './file-picker';
import { MetaField } from './meta';

interface Props {
  name: string;
  label: string;
  fieldType: FieldType;
  allow?: string[]; // mime types for files picker
  isMultiple?: boolean; // for files picker
  disabled?: boolean;

  onBlur?(fieldName: string): void;
}

const JsonValidIndicator = ({ fieldName }: { fieldName: string }) => {
  const formik = useFormikContext();
  const fieldMeta = formik.getFieldMeta<string>(fieldName);

  const isValid: boolean = useMemo(() => {
    const { value } = fieldMeta;
    if (!value) {
      return false;
    }

    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }, [fieldMeta.value]);

  return (
    <JsonValidIndicatorWrapper isValid={isValid}>{isValid ? 'ОК' : 'Ошибка синтаксиса'}</JsonValidIndicatorWrapper>
  );
};

export const FormikFieldResolver = ({ name, fieldType, label, onBlur, disabled, allow, isMultiple }: Props) => {
  const formikContext = useFormikContext();

  const isMultiline = [FieldType.StringArray, FieldType.Json].includes(fieldType);
  const isJson = FieldType.Json === fieldType;
  const errorText = formikContext.getFieldMeta(name).error;

  const handleChangeHtmlText = useCallback(
    newValue => {
      formikContext.setFieldValue(name, newValue);
    },
    [name, formikContext.setFieldValue]
  );

  if (fieldType === FieldType.HtmlText) {
    return <Html initialHTMLValue={formikContext.getFieldProps(name)?.value} onChange={handleChangeHtmlText} />;
  }

  if (fieldType === FieldType.Meta) {
    return <MetaField value={formikContext.getFieldProps(name)?.value} />;
  }

  if (fieldType === FieldType.FilesPicker) {
    return (
      <FilePicker
        isDisabled={disabled}
        value={(formikContext.values as any)[name]}
        onChange={files => {
          formikContext.setFieldValue(name, files);
        }}
        name={name}
        label={label}
        allowedTypes={allow}
        isMultiple={!!isMultiple}
      />
    );
  }

  return (
    <Wrapper>
      <TextField
        label={label}
        fullWidth
        disabled={disabled}
        id={name}
        error={!!errorText}
        helperText={errorText}
        multiline={isMultiline}
        name={name}
        rows={isJson ? 7 : undefined}
        onBlur={() => onBlur && onBlur(name)}
      />
      {isJson && <JsonValidIndicator fieldName={name} />}
      <br />
    </Wrapper>
  );
};
