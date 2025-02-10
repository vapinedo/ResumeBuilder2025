import React from 'react';
import dayjs from 'dayjs';
import { fillPdf } from '@utils/pdfHelper';
import { AutoGridRow } from '@components/AutoGridRow';
import { DatosPersonales } from '@interfaces/HojaDeVida';
import CustomTextField from '@components/CustomTextField';
import { Snackbar, Alert, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomSelectField from '@components/CustomSelectField';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { useDatosPersonalesForm } from '@hooks/useDatosPersonalesForm';
import { datosPersonalesCampos } from '@utils/datosPersonalesFormConfig';

export const DatosPersonalesForm: React.FC = () => {

  const {
    watch,
    errors,
    setValue,
    register,
    onSubmit,
    handleSubmit,
    openSnackbar,
    handleSnackbarClose
  } = useDatosPersonalesForm();
  
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant='h5' gutterBottom>
        Datos Personales
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {datosPersonalesCampos.map((fila, rowIndex) => (
          <AutoGridRow key={rowIndex} rowSpacing={2}>
            {fila.map((campo) => (
              campo.type === 'text' ? (
                <CustomTextField 
                  required 
                  errors={errors} 
                  key={campo.name} 
                  name={campo.name} 
                  label={campo.label} 
                  register={register} 
                />
              ) : campo.type === 'select' ? (
                <CustomSelectField 
                  required 
                  watch={watch} 
                  errors={errors} 
                  key={campo.name} 
                  name={campo.name} 
                  label={campo.label} 
                  register={register} 
                  options={campo.options} 
                />
              ) : (
                <DatePicker
                  key={campo.name}
                  label={campo.label}
                  value={watch(campo.name as keyof DatosPersonales) ? dayjs(watch(campo.name as keyof DatosPersonales)) : null}
                  onChange={(newValue) => setValue(campo.name as keyof DatosPersonales, newValue ? newValue.format('YYYY-MM-DD') : '')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors[campo.name as keyof DatosPersonales],
                      helperText: errors[campo.name as keyof DatosPersonales]?.message
                    }
                  }}
                />
              )
            ))}
          </AutoGridRow>
        ))}

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
