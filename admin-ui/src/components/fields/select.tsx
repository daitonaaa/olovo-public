import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@material-ui/core';
import { FieldWrapper, Error } from './styled';

export interface SelectProps extends MuiSelectProps {
  name: string;
  label?: string;
  options: Array<{ label: string; value: string | number }>;
  disabledOptionsValues?: (string | number)[];
}

export const SelectField: React.FC<SelectProps> = ({
  name,
  label = '',
  variant = 'outlined',
  options,
  disabledOptionsValues,
  ...rest
}) => {
  const isDisabledItem = (value: any) => disabledOptionsValues?.includes(value);
  return (
    <Field name={name} as="select">
      {({ field, meta }: FieldProps) => {
        const hasError = meta.touched && !!meta.error;

        return (
          <FieldWrapper>
            <FormControl fullWidth error={hasError}>
              <InputLabel id={name} variant={variant}>
                {label}
              </InputLabel>
              <MuiSelect variant={variant} labelId={name} displayEmpty {...field} {...rest}>
                {options.map(({ value, label }) => (
                  <MenuItem disabled={isDisabledItem(value)} value={value} key={value}>
                    {label}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
            <ErrorMessage name={name} component={Error} />
          </FieldWrapper>
        );
      }}
    </Field>
  );
};

// interface SelectProps {
//   hasError?: boolean;
//   options: Array<{ label: string; value: string | number }>;
// }

// export const SelectField: React.FC<SelectProps & MuiSelectProps> = props => {
//   const { variant = 'outlined', ...rest } = props;

//   return (
//     <Field name={props.name} as="select">
//       {({ field, meta }: FieldProps) => {
//         return <Select hasError={meta.touched && !!meta.error} variant={variant} {...field} {...rest} />;
//       }}
//     </Field>
//   );
// };

// export const Select: React.FC<SelectProps & MuiSelectProps> = ({
//   hasError,
//   name = '',
//   label = '',
//   variant = 'outlined',
//   options,
//   ...rest
// }) => {
//   return (
//     <FieldWrapper>
//       <FormControl fullWidth error={hasError}>
//         <InputLabel id={name} variant={variant}>
//           {label}
//         </InputLabel>
//         <MuiSelect variant={variant} labelId={name} displayEmpty {...rest}>
//           {options.map(({ value, label }) => (
//             <MenuItem value={value} key={value}>
//               {label}
//             </MenuItem>
//           ))}
//         </MuiSelect>
//       </FormControl>
//       <ErrorMessage name={name} component={Error} />
//     </FieldWrapper>
//   );
// };
