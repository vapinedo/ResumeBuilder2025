import React from "react";
import useCountries from "@hooks/useCountries";
import { CustomSelectField } from "@components/CustomSelectField";
import { FieldErrors, UseFormRegister, UseFormWatch, FieldError } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
}

export const CountrySelect: React.FC<Props> = (props) => {
  const { name, label, required, errors, register, watch } = props;
  const { data: countries, isLoading, error: countriesError } = useCountries();

  const updatedErrors: FieldErrors = {
    ...errors,
    [name]: countriesError
      ? ({ type: "manual", message: "Error al cargar la lista de países" } as FieldError)
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
      options={countries ?? []}
    />
  );
};
