import { FormControlLabel, Switch as MuiSwitch, SwitchProps } from '@material-ui/core';
import { Field, FieldProps } from 'formik';

interface NativeSwitchProps extends SwitchProps {
  label: string;
}

export const NativeSwitch = (props: NativeSwitchProps) => {
  return <FormControlLabel control={<MuiSwitch {...props} color={props.color || 'primary'} />} label={props.label} />;
};

interface FormikSwitchProps extends NativeSwitchProps {
  name: string;
}

export const FormikSwitch = (props: FormikSwitchProps) => {
  return (
    <Field name={props.name}>
      {({ form, field }: FieldProps) => {
        return (
          <NativeSwitch
            {...props}
            label={props.label}
            checked={field.value}
            name={props.name}
            onChange={(e, checked) => {
              props.onChange && props.onChange(e, checked);
              form.setFieldValue(props.name, checked);
            }}
          />
        );
      }}
    </Field>
  );
};
