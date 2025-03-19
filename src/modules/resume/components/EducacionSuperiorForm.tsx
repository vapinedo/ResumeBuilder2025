import React from 'react';
import { AutoGridRow } from '@components/AutoGridRow';
import { CustomSelect } from '@components/CustomSelect';
import { CustomTextField } from '@components/CustomTextField';
import { SectionContainer } from '@containers/SectionContainer';
import { CustomDatePicker } from '@components/CustomDatePicker';
import { ResumeData } from '@modules/resume/interfaces/ResumeData';
import { modalidadAcademicaOptions, siNoOptions } from '@modules/resume/utils/resumeFormOption.helper';
import { Control, FieldErrors, UseFormWatch, UseFormSetValue, UseFormRegister } from 'react-hook-form';

interface Props {
  control: Control<ResumeData>;
  watch: UseFormWatch<ResumeData>;
  errors: FieldErrors<ResumeData>;
  register: UseFormRegister<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
}

export const EducacionSuperiorForm: React.FC<Props> = (props) => {
  const { control, errors, register, setValue, watch } = props;

  return (
    <SectionContainer title="Educacion Superior">
      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomSelect
          required
          watch={watch}
          errors={errors}
          register={register}
          setValue={setValue}
          label="Modalidad Académica"
          options={modalidadAcademicaOptions}
          name="educacionSuperior.modalidadAcademica"
        />
        <CustomTextField
          required
          errors={errors}
          register={register}
          label="Número de Semestres Aprobados"
          name="educacionSuperior.semestresAprobados"
        />
        <CustomSelect
          required
          watch={watch}
          errors={errors}
          register={register}
          setValue={setValue}
          label="Graduado"
          options={siNoOptions}
          name="educacionSuperior.graduado"
        />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomTextField
          required
          errors={errors}
          register={register}
          label="Titulo Obtenido"
          name="educacionSuperior.tituloObtenido"
        />
        <CustomTextField
          required
          errors={errors}
          register={register}
          label="Número Tarjeta Profesional"
          name="educacionSuperior.tarjetProfesional"
        />
        <CustomDatePicker
          required
          errors={errors}
          control={control}
          register={register}
          label="Fecha de Graduación"
          name="educacionSuperior.fechaGrado"
        />
      </AutoGridRow>
    </SectionContainer>
  );
};
