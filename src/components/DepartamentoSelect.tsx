import React from "react";
import useDepartamentos from "@hooks/useDepartamentos";
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

export const DepartamentoSelect: React.FC<Props> = (props) => {
  const { name, label, required, errors, register, watch } = props;
  const { data: departamentos, isLoading, error: departamentosError } = useDepartamentos();

  const updatedErrors: FieldErrors = {
    ...errors,
    [name]: departamentosError
      ? ({ type: "manual", message: "Error al cargar la lista de departamentos" } as FieldError)
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
      options={departamentos ?? []}
    />
  );
};

