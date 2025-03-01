import React from "react";
import useCountries from "@hooks/useCountries";
import { AutoGridRow } from "@components/AutoGridRow";
import { CountrySelect } from "@components/CountrySelect";
import CustomTextField from "@components/CustomTextField";
import SectionContainer from "@containers/SectionContainer";
import { CustomSelectField } from "@components/CustomSelectField";
import { ResumeData } from "@modules/resume/interfaces/ResumeData";
import { sexoOptions, tipoDocumentoOptions } from "@modules/resume/utils/resumeFormOption.helper";
import { Control, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface Props {
  control: Control<ResumeData>;
  watch: UseFormWatch<ResumeData>;
  errors: FieldErrors<ResumeData>;
  register: UseFormRegister<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
}

export const DatosPersonalesFormulario: React.FC<Props> = (props) => {
  const { control, errors, register, setValue, watch } = props;
  const { data: countries, isLoading, error: countriesError } = useCountries();

  const countryOptions = countries
    ? countries.map((country) => ({ value: country.code, label: country.name }))
    : [];

  const updatedErrors = {
    ...errors,
    datosPersonales: {
      ...errors.datosPersonales,
      paisNacimiento: countriesError
        ? { message: "Error al cargar la lista de países" }
        : errors.datosPersonales?.paisNacimiento,
    },
  };

  return (
    <SectionContainer title="Datos Personales">
      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomTextField required name='datosPersonales.primerApellido' label='Primer Apellido' errors={errors} register={register} />
        <CustomTextField required name='datosPersonales.segundoApellido' label='Segundo Apellido' errors={errors} register={register} />
        <CustomTextField required name='datosPersonales.nombres' label='Nombres' errors={errors} register={register} />
        <CustomSelectField required name='datosPersonales.sexo' label='Sexo' errors={errors} register={register} watch={watch} options={sexoOptions} />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomSelectField required name='datosPersonales.tipoDocumento' label='Tipo de Documento' errors={errors} register={register} watch={watch} options={tipoDocumentoOptions} />
        <CustomTextField required name='datosPersonales.numeroDocumento' label='Número de Documento' errors={errors} register={register} />
        <CustomTextField required name='datosPersonales.email' label='Email' errors={errors} register={register} />
        <CustomTextField required name='datosPersonales.telefono' label='Teléfono' errors={errors} register={register} />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CountrySelect required name="datosPersonales.paisNacimiento" label="País de Nacimiento" errors={errors} register={register} watch={watch} />
      </AutoGridRow>
    </SectionContainer>
  );
};
