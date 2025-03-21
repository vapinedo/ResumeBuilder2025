import React from 'react';
import { Button } from '@mui/material';
import { AutoGridRow } from '@components/AutoGridRow';
import { CustomSelect } from '@components/CustomSelect';
import { CustomTextField } from '@components/CustomTextField';
import { SectionContainer } from '@containers/SectionContainer';
import { CustomDatePicker } from '@components/CustomDatePicker';
import { ResumeData } from '@modules/resume/interfaces/ResumeData';
import { modalidadAcademicaOptions, siNoOptions } from '@modules/resume/utils/resumeFormOption.helper';
import { Control, FieldErrors, UseFormWatch, UseFormSetValue, UseFormRegister, useFieldArray } from 'react-hook-form';

const MAX_EDUCACION_SUPERIOR = 4;

interface Props {
  control: Control<ResumeData>;
  watch: UseFormWatch<ResumeData>;
  errors: FieldErrors<ResumeData>;
  register: UseFormRegister<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
}

export const EducacionSuperiorForm: React.FC<Props> = (props) => {
  const { control, errors, register, setValue, watch } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educacionSuperior',
    shouldUnregister: false,
  });

  const handleAppend = () => {
    if (fields.length < 4) {
      append({
        modalidadAcademica: '',
        semestresAprobados: '',
        graduado: '',
        tituloObtenido: '',
        tarjetProfesional: '',
        fechaGrado: '',
      });
    }
  };

  return (
    <SectionContainer title="Educacion Superior">
      {fields.map((field, index) => (
        <div key={field.id}>
          <AutoGridRow spacing={2} rowSpacing={2}>
            <CustomSelect
              required
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              label="Modalidad Académica"
              options={modalidadAcademicaOptions}
              name={`educacionSuperior.${index}.modalidadAcademica`}
            />
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Número de Semestres Aprobados"
              name={`educacionSuperior.${index}.semestresAprobados`}
            />
            <CustomSelect
              required
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              label="Graduado"
              options={siNoOptions}
              name={`educacionSuperior.${index}.graduado`}
            />
          </AutoGridRow>

          <AutoGridRow spacing={2} rowSpacing={2}>
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Titulo Obtenido"
              name={`educacionSuperior.${index}.tituloObtenido`}
            />
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Número Tarjeta Profesional"
              name={`educacionSuperior.${index}.tarjetProfesional`}
            />
            <CustomDatePicker
              required
              errors={errors}
              control={control}
              register={register}
              label="Fecha de Graduación"
              name={`educacionSuperior.${index}.fechaGrado`}
            />
          </AutoGridRow>

          <Button
            size="small"
            color="error"
            variant="contained"
            disabled={fields.length === 1}
            style={{ marginBottom: '28px' }}
            onClick={() => {
              if (fields.length > 1) remove(index);
            }}
          >
            Eliminar
          </Button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAppend}
        disabled={fields.length >= MAX_EDUCACION_SUPERIOR}
        style={{
          marginTop: '10px',
          background: fields.length >= 4 ? 'gray' : 'green',
          color: 'white',
          cursor: fields.length >= 4 ? 'not-allowed' : 'pointer',
        }}
      >
        Agregar Educación Superior ({fields.length}/4)
      </button>
    </SectionContainer>
  );
};
