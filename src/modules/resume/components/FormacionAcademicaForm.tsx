import React from "react";
import { AutoGridRow } from "@components/AutoGridRow";
import { CustomSelect } from "@components/CustomSelect";
import { CustomTextField } from "@components/CustomTextField";
import { SectionContainer } from "@containers/SectionContainer";
import { CustomDatePicker } from "@components/CustomDatePicker";
import { ResumeData } from "@modules/resume/interfaces/ResumeData";
import { educacionBasicaOptions } from "@modules/resume/utils/resumeFormOption.helper";
import { Control, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface Props {
  control: Control<ResumeData>;
  watch: UseFormWatch<ResumeData>;
  errors: FieldErrors<ResumeData>;
  register: UseFormRegister<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
}

export const FormacionAcademicaForm: React.FC<Props> = (props) => {
  const { control, errors, register, setValue, watch } = props;

  return (
    <SectionContainer title="Formación Académica">
      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomSelect required name='formacionAcademica.educacionBasica' label='Educación Básica' errors={errors} register={register} watch={watch} setValue={setValue} options={educacionBasicaOptions} />
        <CustomTextField required name='formacionAcademica.tituloObtenido' label='Título Obtenido' errors={errors} register={register} />
        <CustomDatePicker required name="formacionAcademica.fechaGrado" label="Fecha de Graduación" errors={errors} register={register} control={control} />
      </AutoGridRow>
    </SectionContainer>
  );
};
