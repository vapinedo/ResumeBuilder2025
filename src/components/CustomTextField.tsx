import React from 'react';
import { TextField } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface CustomTextFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>; // Recibe el método register de react-hook-form
  errors: FieldErrors<any>;
  required?: boolean;
  type?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  name,
  register,
  errors,
  required = false,
  type = 'text'
}) => {
  return (
    <TextField
      fullWidth
      variant='outlined'
      label={label}
      type={type}
      error={!!errors[name]}
      helperText={errors[name]?.message as string}
      {...register(name, required ? { required: `${label} es obligatorio` } : {})}
    />
  );
};

export default CustomTextField;
