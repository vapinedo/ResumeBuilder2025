import React from "react";
import useMunicipios from "@hooks/useMunicipios";
import { CustomSelectField } from "@components/CustomSelectField";
import { FieldError, FieldErrors, UseFormWatch, UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
}

export const MunicipioSelect: React.FC<Props> = (props) => {
  const { name, label, required, errors, register, watch } = props;
  const { municipios, isLoading, error: municipiosError } = useMunicipios('La Guajira');

  const updatedErrors: FieldErrors = {
    ...errors,
    [name]: municipiosError
      ? ({ type: "manual", message: "Error al cargar la lista de municipios" } as FieldError)
      : errors[name],
  };

  return (
    <CustomSelectField
      name={name}
      label={label}
      watch={watch}
      required={required}
      register={register}
      errors={updatedErrors}
      options={municipios ?? []}
    />
  );
};