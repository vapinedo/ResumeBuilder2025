import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { DatosPersonales } from "@interfaces/ResumeData";
import CustomTextField from "@components/CustomTextField";
import CustomSelectField from "@components/CustomSelectField";
import { CampoFormulario } from "@utils/datosPersonalesFormConfig";
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";

interface RenderFormFieldsProps {
  campo: CampoFormulario;
  watch: UseFormWatch<DatosPersonales>;
  errors: FieldErrors<DatosPersonales>;
  register: UseFormRegister<DatosPersonales>;
  setValue: UseFormSetValue<DatosPersonales>;
}

export const RenderFormFields: React.FC<RenderFormFieldsProps> = ({ campo, register, watch, setValue, errors }) => {
  // 🔥 Observar el valor del Select de Sexo
  const sexoSeleccionado = watch("sexo");

  // 🔥 Ocultar los campos de libreta militar si el sexo no es Masculino
  if (["tipoLibretaMilitar", "numeroLibretaMilitar", "distritoMilitar"].includes(campo.name) && sexoSeleccionado !== "M") {
    return null;
  }

  switch (campo.type) {
    case "text":
      return (
        <CustomTextField
          required
          errors={errors}
          key={campo.name}
          name={campo.name}
          label={campo.label}
          register={register}
        />
      );
    case "select":
      return (
        <CustomSelectField
          required
          watch={watch}
          errors={errors}
          key={campo.name}
          name={campo.name}
          label={campo.label}
          register={register}
          options={campo.options}
        />
      );
    case "date":
      const dateValue = watch(campo.name as keyof DatosPersonales);
      return (
        <DatePicker
          key={campo.name}
          label={campo.label}
          value={dateValue ? dayjs(dateValue) : null}
          onChange={(newValue) =>
            setValue(campo.name as keyof DatosPersonales, newValue ? newValue.format("YYYY-MM-DD") : "")
          }
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
              error: !!errors[campo.name as keyof DatosPersonales],
              helperText: errors[campo.name as keyof DatosPersonales]?.message,
            },
          }}
        />
      );
    default:
      return null;
  }
};
