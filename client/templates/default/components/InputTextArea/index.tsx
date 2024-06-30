import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { useTheme } from 'styled-components';
import { Box, InnerBox, Label, Error, Input } from './styled';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type: string;
  name: string;
  label: string;
  invalid: any;
  error: string;
  textColor?: string;
  caretColor?: string;
  onChange?: (value: any) => void;
  value: any;
}

export const InputTextArea = ({
  type,
  name,
  label,
  invalid = false,
  error,
  onChange,
  caretColor,
  textColor,
  value,
  ...props
}: IProps) => {
  const theme = useTheme();

  return (
    <Box>
      <InnerBox className={invalid && 'invalid'}>
        {/*// @ts-ignore*/}

        <Input
          onChange={onChange}
          textColor={textColor || theme.palette.text.primary}
          caretColor={caretColor || theme.palette.text.primary}
          id={name}
          placeholder="&nbsp;"
          value={value}
          {...props}
        />
        <Label htmlFor={name}>{label}</Label>
      </InnerBox>
      {invalid && <Error>{error}</Error>}
    </Box>
  );
};
