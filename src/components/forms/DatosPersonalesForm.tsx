import React from 'react';
import dayjs from 'dayjs';
import { AutoGridRow } from '../AutoGridRow';
import { fillPdf } from '../../utils/pdfHelper';
import CustomTextField from '../CustomTextField';
import CustomSelectField from '../CustomSelectField';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Snackbar, Alert, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatosPersonales } from '../../interfaces/HojaDeVida';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { useHojaDeVidaStore } from '../../store/useHojaDeVidaStore';

export const DatosPersonalesForm: React.FC = () => {
  const { setDatosPersonales } = useHojaDeVidaStore();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // Recuperar datos del localStorage para defaultValues
  const storedData = React.useMemo(() => {
    const data = localStorage.getItem('datosPersonales');
    return data ? JSON.parse(data) : {};
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Para reiniciar valores
    watch,
    setValue
  } = useForm<DatosPersonales>({
    defaultValues: storedData // Configurar valores iniciales
  });

  React.useEffect(() => {
    // Sincronizar con el estado global
    Object.keys(storedData).forEach(key => {
      setDatosPersonales(key as keyof DatosPersonales, storedData[key]);
    });

    // Actualizar los valores del formulario al cambiar `storedData`
    reset(storedData);
  }, [storedData, setDatosPersonales, reset]);

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const onSubmit: SubmitHandler<DatosPersonales> = data => {
    try {
      // Guardar en el estado global
      for (const campo in data) {
        setDatosPersonales(campo as keyof DatosPersonales, data[campo as keyof DatosPersonales]);
      }
      // Guardar en el localStorage
      localStorage.setItem('datosPersonales', JSON.stringify(data));
      console.log('Datos Personales guardados:', data);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error guardando los datos:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant='h5' gutterBottom>
        Datos Personales
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoGridRow rowSpacing={2}>
          <CustomTextField label='Primer Apellido' name='primerApellido' register={register} errors={errors} required />
          <CustomTextField label='Segundo Apellido' name='segundoApellido' register={register} errors={errors} required />
          <CustomTextField label='Nombres' name='nombres' register={register} errors={errors} required />
          <CustomSelectField
            label='Sexo'
            name='sexo'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'M', label: 'Masculino (M)' },
              { value: 'F', label: 'Femenino (F)' }
            ]}
          />
        </AutoGridRow>

        <AutoGridRow rowSpacing={2}>
          <CustomSelectField
            label='Tipo de Documento'
            name='tipoDocumento'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
              { value: 'CE', label: 'Cédula de Extranjería (CE)' },
              { value: 'PAS', label: 'Pasaporte (PAS)' }
            ]}
          />
          <CustomTextField required errors={errors} register={register} name='numeroDocumento' label='Número de Documento' />
          <CustomSelectField
            label='Nacionalidad'
            name='nacionalidad'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'COL', label: 'Colombiano (COL)' },
              { value: 'EXT', label: 'Extranjero (EXT)' }
            ]}
          />
          <CustomTextField label='País' name='pais' register={register} errors={errors} required />
        </AutoGridRow>

        <AutoGridRow rowSpacing={2}>
          <CustomSelectField
            label='Tipo de Libreta Militar'
            name='tipoLibretaMilitar'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'primera', label: 'Primesa Clase' },
              { value: 'segunda', label: 'Segunda Clase' }
            ]}
          />

          <CustomTextField
            required
            errors={errors}
            register={register}
            name='numeroLibretaMilitar'
            label='Número de Libreta Militar'
          />
          <CustomTextField label='Distrito Militar' name='distritoMilitar' register={register} errors={errors} required />
        </AutoGridRow>

        <AutoGridRow rowSpacing={2}>
          <DatePicker
            label='Fecha de Nacimiento'
            value={watch('fechaNacimiento') ? dayjs(watch('fechaNacimiento')) : null}
            onChange={newValue => {
              setValue('fechaNacimiento', newValue ? newValue.format('YYYY-MM-DD') : '');
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.fechaNacimiento,
                helperText: errors.fechaNacimiento?.message
              }
            }}
          />
          <CustomSelectField
            label='País de Nacimiento'
            name='paisNacimiento'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'colombia', label: 'Colombia' },
              { value: 'venezuela', label: 'Venezuela' }
            ]}
          />
          <CustomSelectField
            label='Departamento de Nacimiento'
            name='departamentoNacimiento'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'guajira', label: 'La Guajira' },
              { value: 'atlantico', label: 'Atlántico' }
            ]}
          />
          <CustomSelectField
            label='Municipio de Nacimiento'
            name='municipioNacimiento'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'uribia', label: 'Uribia' },
              { value: 'barranquilla', label: 'Barranquilla' }
            ]}
          />
        </AutoGridRow>

        <AutoGridRow>
          <CustomTextField
            required
            errors={errors}
            register={register}
            name='direccionCorrespondencia'
            label='Dirección de Correspondencia'
          />
          <CustomSelectField
            label='País de Correspondencia'
            name='paisCorrespondencia'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'colombia', label: 'Colombia' },
              { value: 'venezuela', label: 'Venezuela' }
            ]}
          />
          <CustomSelectField
            label='Departamento de Correspondencia'
            name='departamentoCorrespondencia'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'guajira', label: 'La Guajira' },
              { value: 'atlantico', label: 'Atlántico' }
            ]}
          />
          <CustomSelectField
            label='Municipio de Correspondencia'
            name='municipioCorrespondencia'
            register={register}
            errors={errors}
            required
            options={[
              { value: 'uribia', label: 'Uribia' },
              { value: 'barranquilla', label: 'Barranquilla' }
            ]}
          />
        </AutoGridRow>

        <AutoGridRow>
          <CustomTextField label='Teléfono' name='telefono' register={register} errors={errors} required />
          <TextField
            fullWidth
            label='Email'
            type='email'
            variant='outlined'
            {...register('email', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingrese un email válido'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </AutoGridRow>

        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary' sx={{ marginTop: 3 }}>
            Guardar Datos
          </Button>

          <Button
            color='success'
            variant='contained'
            sx={{ marginTop: 3, marginLeft: 2 }}
            onClick={async () => {
              const datosPersonales = localStorage.getItem('datosPersonales');
              if (datosPersonales) {
                const parsedDatos: DatosPersonales = JSON.parse(datosPersonales);
                const pdfUrl = await fillPdf(parsedDatos);
                window.open(pdfUrl, '_blank'); // Abrir el PDF en una nueva pestaña
              } else {
                console.log('No hay datos para generar el PDF');
              }
            }}
          >
            Generar PDF
          </Button>
        </Grid>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity='success'>
          Datos guardados correctamente
        </Alert>
      </Snackbar>
    </Paper>
  );
};
