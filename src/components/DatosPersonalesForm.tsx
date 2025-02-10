import React from 'react';
import { Typography, Paper } from '@mui/material';
import { AutoGridRow } from '@components/AutoGridRow';
import { RenderFormFields } from '@components/RenderFormFields';
import { useDatosPersonalesForm } from '@hooks/useDatosPersonalesForm';
import { datosPersonalesCampos } from '@utils/datosPersonalesFormConfig';

export const DatosPersonalesForm: React.FC = () => {
  const { watch, errors, setValue, register } = useDatosPersonalesForm();
  
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant='h5' gutterBottom>
        Datos Personales
      </Typography>

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
    </Paper>
  );
};
