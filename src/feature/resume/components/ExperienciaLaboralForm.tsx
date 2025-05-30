import React from 'react';
import { Button } from '@mui/material';
import { Resume } from '@core/models/Resume';
import { AutoGridRow } from '@components/AutoGridRow';
import { useCountries } from 'shared/hooks/useCountries';
import { CustomSelect } from '@components/CustomSelect';
import { useMunicipios } from 'shared/hooks/useMunicipios';
import TitledSection from '@shared/components/TitledSection';
import { CustomTextField } from '@components/CustomTextField';
import { CustomDatePicker } from '@components/CustomDatePicker';
import { useDepartamentos } from 'shared/hooks/useDepartamentos';
import { tipoEmpresaOptions } from '@core/constants/dropdownOptions';
import { Control, FieldErrors, UseFormWatch, UseFormSetValue, UseFormRegister, useFieldArray } from 'react-hook-form';

const MAX_DYNAMIC_FIELDS = 4;

interface Props {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  errors: FieldErrors<Resume>;
  register: UseFormRegister<Resume>;
  setValue: UseFormSetValue<Resume>;
}

export const ExperienciaLaboralForm: React.FC<Props> = (props) => {
  const { data: countries } = useCountries();
  const { data: departamentos } = useDepartamentos();
  const { data: municipios } = useMunicipios('La Guajira');

  const { control, errors, register, setValue, watch } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experienciaLaboral',
    shouldUnregister: false,
  });

  const handleAppend = () => {
    if (fields.length < MAX_DYNAMIC_FIELDS) {
      append({
        empresa: '',
        tipoEmpresa: '',
        paisEmpresa: '',
        departamentoEmpresa: '',
        municipioEmpresa: '',
        correoElectronico: '',
        telefonoEmpresa: '',
        fechaInicio: '',
        fechaFin: '',
        cargo: '',
        dependencia: '',
        direccionEmpresa: '',
      });
    }
  };

  return (
    <TitledSection title="Experiencia Laboral">
      {fields.map((field, index) => (
        <div key={field.id}>
          <AutoGridRow spacing={2} rowSpacing={2}>
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Empresa o Entidad"
              name={`experienciaLaboral.${index}.empresa`}
            />
            <CustomSelect
              required
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              label="Tipo de Empresa"
              options={tipoEmpresaOptions}
              name={`experienciaLaboral.${index}.tipoEmpresa`}
            />
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Teléfonos"
              name={`experienciaLaboral.${index}.telefonoEmpresa`}
            />
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Correo Electrónico"
              name={`experienciaLaboral.${index}.correoElectronico`}
            />
          </AutoGridRow>

          <AutoGridRow spacing={2} rowSpacing={2}>
            <CustomSelect
              required
              label="País"
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              options={countries ?? []}
              name={`experienciaLaboral.${index}.paisEmpresa`}
            />
            <CustomSelect
              required
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              options={departamentos ?? []}
              label="Departamento"
              name={`experienciaLaboral.${index}.departamentoEmpresa`}
            />
            <CustomSelect
              required
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              options={municipios ?? []}
              label="Municipio"
              name={`experienciaLaboral.${index}.municipioEmpresa`}
            />
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Dirección"
              name={`experienciaLaboral.${index}.direccionEmpresa`}
            />
          </AutoGridRow>

          <AutoGridRow spacing={2} rowSpacing={2}>
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Cargo"
              name={`experienciaLaboral.${index}.cargo`}
            />
            <CustomTextField
              required
              errors={errors}
              register={register}
              label="Dependencia"
              name={`experienciaLaboral.${index}.dependencia`}
            />
            <CustomDatePicker
              required
              errors={errors}
              control={control}
              register={register}
              label="Fecha de Inicio"
              name={`experienciaLaboral.${index}.fechaInicio`}
            />
            <CustomDatePicker
              required
              errors={errors}
              control={control}
              register={register}
              label="Fecha de Fin"
              name={`experienciaLaboral.${index}.fechaFin`}
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
        disabled={fields.length >= MAX_DYNAMIC_FIELDS}
        style={{
          marginTop: '10px',
          background: fields.length >= MAX_DYNAMIC_FIELDS ? 'gray' : 'green',
          color: 'white',
          cursor: fields.length >= MAX_DYNAMIC_FIELDS ? 'not-allowed' : 'pointer',
        }}
      >
        Agregar Experiencia Laboral ({fields.length}/{MAX_DYNAMIC_FIELDS})
      </button>
    </TitledSection>
  );
};
