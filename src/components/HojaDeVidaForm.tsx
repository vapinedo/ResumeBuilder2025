import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { FormButtons } from '@components/FormButtons';
import { DatosPersonalesForm } from '@components/DatosPersonalesForm';
import { useDatosPersonalesForm } from '@hooks/useDatosPersonalesForm';

export const HojaDeVidaForm: React.FC = () => {
  const { onSubmit, handleSubmit, openSnackbar, handleSnackbarClose } = useDatosPersonalesForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DatosPersonalesForm />
      <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />

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
    </form>
  );
};
