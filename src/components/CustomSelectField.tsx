import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface SelectOption {
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

export const CustomSelectField: React.FC<CustomSelectFieldProps> = (props) => {
  const { label, name, register, watch, errors, options, required } = props;
  const selectedValue = watch(name) ?? "";

  return (
    <TextField
      select
      fullWidth
      size="small"
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message ? String(errors[name]?.message) : undefined}
      {...register(name, {
        required: required ? "Este campo es obligatorio" : false,
      })}
      value={selectedValue}
      onChange={(e) => register(name).onChange(e)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
