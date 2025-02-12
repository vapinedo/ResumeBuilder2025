import React, { useEffect } from 'react';
import useCountries from '@hooks/useCountries';
import { Typography, Paper } from '@mui/material';
import CountrySelect from '@components/CountrySelect';
import { AutoGridRow } from '@components/AutoGridRow';
import { DatosPersonales } from '@interfaces/HojaDeVida';
import { RenderFormFields } from '@components/RenderFormFields';
import { datosPersonalesFormConfig } from '@utils/datosPersonalesFormConfig';
import { UseFormRegister, FieldErrors, UseFormSetValue, Control } from 'react-hook-form';

interface Props {
  watch: any;
  errors: FieldErrors<DatosPersonales>;
  register: UseFormRegister<DatosPersonales>;
  setValue: UseFormSetValue<DatosPersonales>;
  control: Control<DatosPersonales>; // 🔥 Agregamos control para manejar CountrySelect
}

export const DatosPersonalesForm: React.FC<Props> = ({ register, errors, setValue, watch, control }) => {
  const { data: countries, isLoading, error } = useCountries();

  // 🔍 🔥 Normalizar `paisCorrespondencia`
  useEffect(() => {
    const paisCorrespondencia = watch("paisCorrespondencia");

    if (paisCorrespondencia && typeof paisCorrespondencia === "string") {
      // Buscar la opción correcta en la lista de países
      const matchedCountry = countries?.find(
        (c) => c.value.toLowerCase() === paisCorrespondencia.toLowerCase()
      );

      // Si encontramos una coincidencia y el valor es incorrecto, lo corregimos
      if (matchedCountry && matchedCountry.value !== paisCorrespondencia) {
        setValue("paisCorrespondencia", matchedCountry.value);
      }
    }
  }, [watch("paisCorrespondencia"), countries, setValue]);

  if (isLoading) return <p>Cargando países...</p>;
  if (error) return <p>Error al cargar los países</p>;

  const datosPersonalesFormConfiguration = datosPersonalesFormConfig(countries || []); 

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant='h5' gutterBottom>
        Datos Personales
      </Typography>

      {datosPersonalesFormConfiguration.map((fila, rowIndex) => (
        <AutoGridRow key={rowIndex} rowSpacing={2}>
          {fila.map((campo) =>
            campo.name === "paisCorrespondencia" || campo.name === "paisNacimiento" ? (
              <CountrySelect key={campo.name} name={campo.name} control={control} />
            ) : (
              <RenderFormFields
                campo={campo}
                watch={watch}
                errors={errors}
                key={campo.name}
                register={register}
                setValue={setValue}
              />
            )
          )}
        </AutoGridRow>
      ))}
    </Paper>
  );
};
