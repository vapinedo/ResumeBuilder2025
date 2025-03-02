import React, { useEffect } from "react";
import { AutoGridRow } from "@components/AutoGridRow";
import { CountrySelect } from "@components/CountrySelect";
import CustomTextField from "@components/CustomTextField";
import SectionContainer from "@containers/SectionContainer";
import { MunicipioSelect } from "@components/MunicipioSelect";
import { CustomDatePicker } from "@components/CustomDatePicker";
import { CustomSelectField } from "@components/CustomSelectField";
import { ResumeData } from "@modules/resume/interfaces/ResumeData";
import { DepartamentoSelect } from "@components/DepartamentoSelect";
import { Control, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { sexoOptions, tipoDocumentoOptions, tipoLibretaMilitarOptions } from "@modules/resume/utils/resumeFormOption.helper";

interface Props {
  control: Control<ResumeData>;
  watch: UseFormWatch<ResumeData>;
  errors: FieldErrors<ResumeData>;
  register: UseFormRegister<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
}

export const DatosPersonalesFormulario: React.FC<Props> = (props) => {
  const { control, errors, register, setValue, watch } = props;

  const selectedSexo = watch("datosPersonales.sexo");

  useEffect(() => {
    if (selectedSexo !== "M") {
      setValue("datosPersonales.tipoLibretaMilitar", "");
      setValue("datosPersonales.numeroLibretaMilitar", "");
      setValue("datosPersonales.distritoMilitar", "");
    }
  }, [selectedSexo, setValue]);

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
        <CustomDatePicker required name="datosPersonales.fechaNacimiento" label="Fecha de Nacimiento" errors={errors} register={register} control={control} />
        <CountrySelect required name="datosPersonales.paisNacimiento" label="País de Nacimiento" errors={errors} register={register} watch={watch} />
        <DepartamentoSelect required name="datosPersonales.departamentoNacimiento" label="Departamento de Nacimiento" errors={errors} register={register} watch={watch} />
        <MunicipioSelect required name="datosPersonales.municipioNacimiento" label="Municipio de Nacimiento" errors={errors} register={register} watch={watch} />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomTextField required name='datosPersonales.direccionCorrespondencia' label='Dirección de Correspondencia' errors={errors} register={register} />
        <CountrySelect required name="datosPersonales.paisCorrespondencia" label="País de Correspondencia" errors={errors} register={register} watch={watch} />
        <DepartamentoSelect required name="datosPersonales.departamentoCorrespondencia" label="Departamento de Correspondencia" errors={errors} register={register} watch={watch} />
        <MunicipioSelect required name="datosPersonales.municipioCorrespondencia" label="Municipio de Correspondencia" errors={errors} register={register} watch={watch} />
      </AutoGridRow>

      {selectedSexo === "M" && (
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomSelectField required name='datosPersonales.tipoLibretaMilitar' label='Tipo Libreta Militar' errors={errors} register={register} watch={watch} options={tipoLibretaMilitarOptions} />
          <CustomTextField required name='datosPersonales.numeroLibretaMilitar' label='Numero Libreta Militar' errors={errors} register={register} />
          <CustomTextField required name='datosPersonales.distritoMilitar' label='Distrito Militar' errors={errors} register={register} />
        </AutoGridRow>
      )}
    </SectionContainer>
  );
};
