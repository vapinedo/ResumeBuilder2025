import { useCallback } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BoxShadow from '@shared/containers/BoxShadow';
import { FieldErrors, useForm } from 'react-hook-form';
import { useCrearPersona } from '@core/hooks/usePersona';
import { Persona } from '@feature/persona/models/Persona';
import { useCountries } from '@shared/hooks/useCountries';
import { useMunicipios } from '@shared/hooks/useMunicipios';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { CustomSelect } from '@shared/components/CustomSelect';
import { useDepartamentos } from '@shared/hooks/useDepartamentos';
import { CustomTextField } from '@shared/components/CustomTextField';
import { CustomDatePicker } from '@shared/components/CustomDatePicker';
import { sexoOptions, tipoDocumentoOptions } from '@feature/resume/utils/resumeFormOption.helper';

const defaultValues: Persona = {
  sexo: '',
  email: '',
  nombres: '',
  telefono: '',
  tipoDocumento: '',
  primerApellido: '',
  paisNacimiento: '',
  segundoApellido: '',
  numeroDocumento: '',
  fechaNacimiento: '',
  municipioNacimiento: '',
  departamentoNacimiento: '',
};

export default function PersonaForm() {
  const navigate = useNavigate();
  const crearPersona = useCrearPersona();

  const { data: countries } = useCountries();
  const { data: departamentos } = useDepartamentos();
  const { data: municipios } = useMunicipios('La Guajira');

  const form = useForm<Persona>({
    defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, setValue, watch } = form;
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = useCallback(
    async (persona: Persona) => {
      try {
        await crearPersona.mutateAsync({ persona });
        navigate('/personas');
      } catch (error) {
        console.error(error);
      }
    },
    [crearPersona, navigate]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  return (
    <BoxShadow>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>Nueva persona</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomTextField required name="nombres" label="Nombres" errors={errors} register={register} />
          <CustomTextField required name="primerApellido" label="Primer Apellido" errors={errors} register={register} />
          <CustomTextField required name="segundoApellido" label="Segundo Apellido" errors={errors} register={register} />
          <CustomSelect
            required
            name="sexo"
            label="Sexo"
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            options={sexoOptions}
          />
        </AutoGridRow>

        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomSelect
            required
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            label="Tipo de Documento"
            options={tipoDocumentoOptions}
            name="tipoDocumento"
          />
          <CustomTextField required errors={errors} register={register} label="Número de Documento" name="numeroDocumento" />
          <CustomTextField required name="email" label="Email" errors={errors} register={register} />
          <CustomTextField required name="telefono" label="Teléfono" errors={errors} register={register} />
        </AutoGridRow>

        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomDatePicker
            required
            errors={errors}
            control={control}
            register={register}
            name="fechaNacimiento"
            label="Fecha de Nacimiento"
          />
          <CustomSelect
            required
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            options={countries ?? []}
            name="paisNacimiento"
            label="País de Nacimiento"
          />
          <CustomSelect
            required
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            options={departamentos ?? []}
            name="departamentoNacimiento"
            label="Departamento de Nacimiento"
          />
          <CustomSelect
            required
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            options={municipios ?? []}
            name="municipioNacimiento"
            label="Municipio de Nacimiento"
          />
        </AutoGridRow>

        <Button
          type="submit"
          color="success"
          variant="contained"
          sx={{ marginTop: 2 }}
          disabled={isSubmitting || !isValid || crearPersona.isPending}
        >
          {crearPersona.isPending ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </BoxShadow>
  );
}
