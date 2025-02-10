import React from 'react';
import { fillPdf } from '@utils/pdfHelper';
import { Button, Grid } from '@mui/material';

interface FormButtonsProps {
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: (data: any) => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({ handleSubmit, onSubmit }) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end" sx={{ marginTop: 3 }}>
      <Grid item>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Guardar Datos
        </Button>
      </Grid>

      <Grid item>
        <Button
          color="success"
          variant="contained"
          onClick={async () => {
            const datosPersonales = localStorage.getItem('datosPersonales');
            if (datosPersonales) {
              const parsedDatos = JSON.parse(datosPersonales);
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
    </Grid>
  );
};
