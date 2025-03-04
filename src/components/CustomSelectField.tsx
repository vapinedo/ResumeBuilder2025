import React from "react";
import { get} from "lodash";
import { TextField, MenuItem } from "@mui/material";
import { ResumeData } from "@modules/resume/interfaces/ResumeData";
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectFieldProps {
  name: string;
  label: string;
  required?: boolean;
  options: SelectOption[];
  watch: UseFormWatch<any>;
  errors: FieldErrors<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
  register: UseFormRegister<ResumeData>;
}

export const CustomSelectField: React.FC<CustomSelectFieldProps> = (props) => {
  const { label, name, register, watch, errors, options, required, setValue } = props;
  const selectedValue = watch(name) ?? "";

  return (
    <TextField
      select
      fullWidth
      size="small"
      label={label}
      variant="outlined"
      error={Boolean(get(errors, name))}
      helperText={get(errors, `${name}.message`, null)}
      {...register(name as any, {
        required: required ? `${label} es obligatorio` : false,
      })}
      value={selectedValue}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(name as any, newValue, { shouldValidate: true });
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
