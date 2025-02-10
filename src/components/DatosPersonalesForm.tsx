import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AutoGridRow } from '@components/AutoGridRow';
import { FormButtons } from '@components/FormButtons';
import { Typography, Paper } from '@mui/material';
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

        <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />
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
