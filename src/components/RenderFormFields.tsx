import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { CountrySelect } from "@components/CountrySelect";
import MunicipioSelect from "@components/MunicipioSelect";
import CustomTextField from "@components/CustomTextField";
import CustomSelectField from "@components/CustomSelectField";
import DepartamentoSelect from "@components/DepartamentoSelect";
import { DatosPersonales } from "modules/resume/interfaces/DatosPersonales";
import { CampoFormulario } from "modules/resume/utils/datosPersonalesFormConfig";
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue, Control } from "react-hook-form";

interface RenderFormFieldsProps {
  campo: CampoFormulario;
  paisNacimiento: string;
  paisCorrespondencia: string;
  departamentoNacimiento: string;
  control: Control<DatosPersonales>;
  departamentoCorrespondencia: string;
  errors: FieldErrors<DatosPersonales>;
  watch: UseFormWatch<DatosPersonales>;
  register: UseFormRegister<DatosPersonales>;
  setValue: UseFormSetValue<DatosPersonales>;
}

export const RenderFormFields: React.FC<RenderFormFieldsProps> = (props) => {
  const {
    watch,
    campo,
    errors,
    control,
    register,
    setValue,
    paisNacimiento,
    paisCorrespondencia,
    departamentoNacimiento,
    departamentoCorrespondencia,
  } = props;
  const sexoSeleccionado = watch("sexo");

  if (["tipoLibretaMilitar", "numeroLibretaMilitar", "distritoMilitar"].includes(campo.name) && sexoSeleccionado !== "M") {
    return null;
  }

  switch (campo.name) {
    case "paisNacimiento":
    case "paisCorrespondencia":
      return <CountrySelect key={campo.name} name={campo.name} control={control} />;

    case "departamentoCorrespondencia":
      return <DepartamentoSelect key={campo.name} name={campo.name} control={control} selectedCountry={paisCorrespondencia} />;

    case "departamentoNacimiento":
      return <DepartamentoSelect key={campo.name} name={campo.name} control={control} selectedCountry={paisNacimiento} />;

    case "municipioCorrespondencia":
      return <MunicipioSelect key={campo.name} name={campo.name} control={control} selectedDepartamento={departamentoCorrespondencia} />;

    case "municipioNacimiento":
      return <MunicipioSelect key={campo.name} name={campo.name} control={control} selectedDepartamento={departamentoNacimiento} />;

    default:
      break;
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
