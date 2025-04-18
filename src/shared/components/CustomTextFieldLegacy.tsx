import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'error'> {
  register?: UseFormRegisterReturn;
  error?: string;
}

const CustomTextFieldLegacy: FC<InputProps> = ({ error, register, ...rest }) => {
  return (
    <TextField
      {...rest}
      size="small"
      error={!!error}
      label={rest.label}
      sx={{ width: '100%' }}
      {...(register ? register : {})}
      helperText={error && <span className="text-danger">{error}</span>}
    />
  );
};

export default CustomTextFieldLegacy;
