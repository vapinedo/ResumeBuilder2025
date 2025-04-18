import React from 'react';
import { AutoGridRow } from '@components/AutoGridRow';
import { CustomSelect } from '@components/CustomSelect';
import { CustomTextField } from '@components/CustomTextField';
import { SectionContainer } from 'shared/containers/SectionContainer';
import { CustomDatePicker } from '@components/CustomDatePicker';
import { Resume } from '@core/models/Resume';
import { educacionBasicaOptions } from '@core/constants/dropdownOptions';
import { Control, FieldErrors, UseFormWatch, UseFormSetValue, UseFormRegister } from 'react-hook-form';

interface Props {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  errors: FieldErrors<Resume>;
  register: UseFormRegister<Resume>;
  setValue: UseFormSetValue<Resume>;
}

export const EducacionBasicaForm: React.FC<Props> = (props) => {
  const { control, errors, register, setValue, watch } = props;

  return (
    <SectionContainer title="Educacion Básica">
      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomSelect
          required
          watch={watch}
          errors={errors}
          register={register}
          setValue={setValue}
          label="Educación Básica"
          options={educacionBasicaOptions}
          name="educacionBasica.educacionBasica"
        />
        <CustomTextField
          required
          errors={errors}
          register={register}
          label="Título Obtenido"
          name="educacionBasica.tituloObtenido"
        />
        <CustomDatePicker
          required
          errors={errors}
          control={control}
          register={register}
          label="Fecha de Graduación"
          name="educacionBasica.fechaGrado"
        />
      </AutoGridRow>
    </SectionContainer>
  );
};
