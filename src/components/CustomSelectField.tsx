import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  options: SelectOption[];
  required?: boolean;
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ label, name, register, errors, options, required }) => {
  return (
    <TextField
      select
      fullWidth
      label={label}
      variant='outlined'
      error={!!errors[name]}
      helperText={errors[name]?.message ? String(errors[name]?.message) : undefined}
      {...register(name, { required: required ? 'Este campo es obligatorio' : false })}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelectField;
