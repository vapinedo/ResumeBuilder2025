import React from "react";
import { AutoGridRow } from "@components/AutoGridRow";
import { CustomSelect } from "@components/CustomSelect";
import { SectionContainer } from "@containers/SectionContainer";
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
        <CustomSelect required name='datosPersonales.educacionBasica' label='Educación Básica' errors={errors} register={register} watch={watch} setValue={setValue} options={educacionBasicaOptions} />
      </AutoGridRow>
    </SectionContainer>
  );
};
