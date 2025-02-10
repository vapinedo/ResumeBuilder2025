import React from 'react';
import { fillPdf } from '@utils/pdfHelper';
import { Snackbar, Alert } from '@mui/material';
import { AutoGridRow } from '@components/AutoGridRow';
import { DatosPersonales } from '@interfaces/HojaDeVida';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { RenderFormFields } from '@components/RenderFormFields';
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
              <RenderFormFields
                key={campo.name}
                campo={campo}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
              />
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
