import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import MUTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Error, FieldWrapper } from './styled';

interface Props {
  numberMode?: boolean;
}

export const TextField: React.FC<Props & TextFieldProps> = props => {
  const { numberMode, name = '', variant = 'outlined', ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const hasError = meta.touched && !!meta.error;

        return (
          <Input
            numberMode={numberMode}
            error={hasError}
            variant={variant}
            {...field}
            {...rest}
            errorNode={<ErrorMessage name={name} component={() => <Error />} />}
          />
        );
      }}
    </Field>
  );
};

interface InputProps extends Props {
  errorNode?: React.ReactNode;
}

export const Input: React.FC<InputProps & TextFieldProps> = props => {
  const { numberMode, errorNode, variant = 'outlined', ...rest } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numberMode && isNaN(+e.currentTarget.value)) return;

    props.onChange && props.onChange(e);
  };

  return (
    <FieldWrapper>
      <MUTextField {...rest} variant={variant} onChange={onChange} />
      {errorNode && errorNode}
    </FieldWrapper>
  );
};
