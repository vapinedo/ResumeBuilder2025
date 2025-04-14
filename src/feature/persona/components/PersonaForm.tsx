import { Button, Snackbar } from '@mui/material';
import BoxShadow from '@shared/containers/BoxShadow';
import { FieldErrors, useForm } from 'react-hook-form';
import { Persona } from '@feature/persona/models/Persona';
import { useNavigate, useParams } from 'react-router-dom';
import { useCountries } from '@shared/hooks/useCountries';
import usePersonaStore from '@core/stores/usePersonaStore';
import { useMunicipios } from '@shared/hooks/useMunicipios';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { CustomSelect } from '@shared/components/CustomSelect';
import { useDepartamentos } from '@shared/hooks/useDepartamentos';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { CustomTextField } from '@shared/components/CustomTextField';
import { CustomDatePicker } from '@shared/components/CustomDatePicker';
import { estadoPublicacionOptions } from '@core/mocks/DropdownOptions';
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
  const { crear } = usePersonaStore();
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');

  const { data: countries } = useCountries();
  const { data: departamentos } = useDepartamentos();
  const { data: municipios } = useMunicipios('La Guajira');

  const form = useForm<Persona>({
    defaultValues: defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, setValue, getValues, watch, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = useCallback(
    async (persona: Persona) => {
      try {
        console.log(persona);
        await crear(persona);
        // setOpenSnackbar(true);
        navigate('/personas');
      } catch (error) {
        console.error(error);
        // setSnackbarMessage('Ocurrió un error al guardar la persona');
        // setOpenSnackbar(true);
      }
    },
    [crear]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  // const handleCloseSnackbar = () => {
  //   setOpenSnackbar(false);
  // };

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

        <Button type="submit" color="success" variant="contained" sx={{ marginTop: 2 }} disabled={isSubmitting || !isValid}>
          Guardar
        </Button>

        {/* <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          message={snackbarMessage}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        /> */}
      </form>
    </BoxShadow>
  );
}
