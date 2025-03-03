import React from "react";
import { get } from "lodash";
import { TextField } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { DatosPersonales, ResumeData } from "@modules/resume/interfaces/ResumeData";

interface Props {
  type?: string;
  label: string;
  required?: boolean;
  errors: FieldErrors<ResumeData>;
  register: UseFormRegister<ResumeData>;
  name: keyof ResumeData | `datosPersonales.${keyof DatosPersonales}`;
}

export const CustomTextField: React.FC<Props> = (props) => {
  const {
    label,
    name,
    errors,
    register,
    type = "text",
    required = false,
  } = props;
  
  return (
    <TextField
      fullWidth
      type={type}
      size="small"
      label={label}
      variant="outlined"
      error={Boolean(get(errors, name))}
      helperText={get(errors, `${name}.message`, " ")}
      {...register(name as any, required ? { required: `${label} es obligatorio` } : undefined)}
    />
  );
};
