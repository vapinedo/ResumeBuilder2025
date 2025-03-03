import React from 'react';
import { TextField } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface CustomTextFieldProps {
  type?: string;
  label: string;
  name: string;
  required?: boolean;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  const {
    label,
    name,
    errors,
    register,
    type = 'text',
    required = false,
  } = props; 

  return (
    <TextField
      fullWidth
      type={type}
      size='small'
      label={label}
      variant='outlined'
      error={!!errors[name]}
      helperText={errors[name]?.message ? String(errors[name]?.message) : undefined}
      {...register(name, required ? { required: `${label} es obligatorio` } : undefined)}
    />
  );
};
