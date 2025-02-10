import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectFieldProps {
  name: string;
  label: string;
  required?: boolean;
  errors: FieldErrors;
  options: SelectOption[];
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ label, name, register, watch, errors, options, required }) => {
  const selectedValue = watch(name) ?? "";

  return (
    <TextField
      select
      fullWidth
      size='small'
      label={label}
      variant='outlined'
      value={selectedValue}
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
