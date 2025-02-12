import React from 'react';
import { Typography, Paper } from '@mui/material';
import { AutoGridRow } from '@components/AutoGridRow';
import { DatosPersonales } from '@interfaces/HojaDeVida';
import { RenderFormFields } from '@components/RenderFormFields';
import { datosPersonalesCampos } from '@utils/datosPersonalesFormConfig';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';

interface Props {
  watch: any;
  errors: FieldErrors<DatosPersonales>;
  register: UseFormRegister<DatosPersonales>;
  setValue: UseFormSetValue<DatosPersonales>;
}

export const DatosPersonalesForm: React.FC<Props> = ({ register, errors, setValue, watch }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant='h5' gutterBottom>
        Datos Personales
      </Typography>

      {datosPersonalesCampos.map((fila, rowIndex) => (
        <AutoGridRow key={rowIndex} rowSpacing={2}>
          {fila.map((campo) => (
            <RenderFormFields
              campo={campo}
              watch={watch}
              errors={errors}
              key={campo.name}
              register={register}
              setValue={setValue}
            />
          ))}
        </AutoGridRow>
      ))}
    </Paper>
  );
};
