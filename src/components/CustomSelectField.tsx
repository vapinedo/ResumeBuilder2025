import React from "react";
import { get} from "lodash";
import { TextField, MenuItem } from "@mui/material";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { ResumeData } from "@modules/resume/interfaces/ResumeData";

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
  register: UseFormRegister<ResumeData>;
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
      error={Boolean(get(errors, name))}
      helperText={get(errors, `${name}.message`, null)}
      {...register(name as any, {
        required: required ? "Este campo es obligatorio" : false,
      })}
      value={selectedValue}
      onChange={(e) => register(name as any).onChange(e)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
