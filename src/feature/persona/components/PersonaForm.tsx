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
import { Button, FormControl, InputLabel, MenuItem, Snackbar } from '@mui/material';
import { tipoDocumentoOptions } from '@feature/resume/utils/resumeFormOption.helper';

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

interface ArticuloFormProps {
  isEditMode: boolean;
}

export default function PersonaForm({ isEditMode }: ArticuloFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { crear, actualizar, obtener, personas, lista } = usePersonaStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { data: countries } = useCountries();
  const { data: departamentos } = useDepartamentos();
  const { data: municipios } = useMunicipios('La Guajira');

  const form = useForm<Persona>({
    defaultValues: defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, setValue, getValues, watch, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    lista(); // carga inicial
  }, [lista]);

  useEffect(() => {
    if (isEditMode && id) {
      const persona = obtener(id);
      if (persona) {
        reset(persona);
      }
    }
  }, [isEditMode, id, obtener, personas, reset]);

  const estadoOptions = useMemo(() => estadoPublicacionOptions, []);

  const onSubmit = useCallback(
    async (persona: Persona) => {
      try {
        if (isEditMode) {
          await actualizar(persona);
          setSnackbarMessage('Persona actualizada exitosamente');
        } else {
          await crear(persona);
          setSnackbarMessage('Persona creada exitosamente');
        }
        setOpenSnackbar(true);
        // navigate('/personas');
      } catch (error) {
        console.error(error);
        setSnackbarMessage('Ocurrió un error al guardar la persona');
        setOpenSnackbar(true);
      }
    },
    [isEditMode, crear, actualizar]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <BoxShadow>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>{isEditMode ? 'Editar persona' : 'Nueva persona'}</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomTextField
            required
            name="datosPersonales.primerApellido"
            label="Primer Apellido"
            errors={errors}
            register={register}
          />
          <CustomTextField
            required
            name="datosPersonales.segundoApellido"
            label="Segundo Apellido"
            errors={errors}
            register={register}
          />
          <CustomTextField required name="datosPersonales.nombres" label="Nombres" errors={errors} register={register} />
          <CustomSelect
            required
            name="datosPersonales.sexo"
            label="Sexo"
            errors={errors}
            register={register}
            watch={watch}
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
            name="datosPersonales.tipoDocumento"
          />
          <CustomTextField
            required
            errors={errors}
            register={register}
            label="Número de Documento"
            name="datosPersonales.numeroDocumento"
          />
          <CustomTextField required name="datosPersonales.email" label="Email" errors={errors} register={register} />
          <CustomTextField required name="datosPersonales.telefono" label="Teléfono" errors={errors} register={register} />
        </AutoGridRow>

        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomDatePicker
            required
            name="datosPersonales.fechaNacimiento"
            label="Fecha de Nacimiento"
            errors={errors}
            register={register}
            control={control}
          />
          <CustomSelect
            required
            name="datosPersonales.paisNacimiento"
            label="País de Nacimiento"
            errors={errors}
            register={register}
            watch={watch}
            setValue={setValue}
            options={countries ?? []}
          />
          <CustomSelect
            required
            name="datosPersonales.departamentoNacimiento"
            label="Departamento de Nacimiento"
            errors={errors}
            register={register}
            watch={watch}
            setValue={setValue}
            options={departamentos ?? []}
          />
          <CustomSelect
            required
            name="datosPersonales.municipioNacimiento"
            label="Municipio de Nacimiento"
            errors={errors}
            register={register}
            watch={watch}
            setValue={setValue}
            options={municipios ?? []}
          />
        </AutoGridRow>

        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomTextField
            required
            name="datosPersonales.direccionCorrespondencia"
            label="Dirección de Correspondencia"
            errors={errors}
            register={register}
          />
          <CustomSelect
            required
            name="datosPersonales.paisCorrespondencia"
            label="País de Correspondencia"
            errors={errors}
            register={register}
            watch={watch}
            setValue={setValue}
            options={countries ?? []}
          />
          <CustomSelect
            required
            name="datosPersonales.departamentoCorrespondencia"
            label="Departamento de Correspondencia"
            errors={errors}
            register={register}
            watch={watch}
            setValue={setValue}
            options={departamentos ?? []}
          />
          <CustomSelect
            required
            name="datosPersonales.municipioCorrespondencia"
            label="Municipio de Correspondencia"
            errors={errors}
            register={register}
            watch={watch}
            setValue={setValue}
            options={municipios ?? []}
          />
        </AutoGridRow>

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2 }}
          disabled={isSubmitting || !isValid}
          color={isEditMode ? 'success' : 'primary'}
        >
          {isEditMode ? 'Actualizar' : 'Guardar'}
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          message={snackbarMessage}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </form>
    </BoxShadow>
  );
}
