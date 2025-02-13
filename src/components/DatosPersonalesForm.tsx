import React, { useEffect } from "react";
import useCountries from "@hooks/useCountries";
import { Typography, Paper } from "@mui/material";
import CountrySelect from "@components/CountrySelect";
import DepartamentoSelect from "@components/DepartamentoSelect"; // 🔥 Importamos el nuevo select
import useDepartamentos from "@hooks/useDepartamentos";
import { AutoGridRow } from "@components/AutoGridRow";
import { DatosPersonales } from "@interfaces/HojaDeVida";
import { RenderFormFields } from "@components/RenderFormFields";
import { datosPersonalesFormConfig } from "@utils/datosPersonalesFormConfig";
import { UseFormRegister, FieldErrors, UseFormSetValue, Control } from "react-hook-form";

interface Props {
  watch: any;
  errors: FieldErrors<DatosPersonales>;
  register: UseFormRegister<DatosPersonales>;
  setValue: UseFormSetValue<DatosPersonales>;
  control: Control<DatosPersonales>;
}

export const DatosPersonalesForm: React.FC<Props> = ({ register, errors, setValue, watch, control }) => {
  const { data: countries, isLoading: isLoadingCountries, error } = useCountries();
  const { departamentos, isLoading: isLoadingDepartamentos } = useDepartamentos();

  // 🔥 Obtenemos el país seleccionado en cada caso
  const paisNacimiento = watch("paisNacimiento") || "";
  const paisCorrespondencia = watch("paisCorrespondencia") || "";

  useEffect(() => {
    const normalizarPais = () => {
      const paisCorrespondencia = watch("paisCorrespondencia");
      if (paisCorrespondencia && typeof paisCorrespondencia === "string") {
        const matchedCountry = countries?.find(
          (c) => c.value.toLowerCase() === paisCorrespondencia.toLowerCase()
        );
        if (matchedCountry && matchedCountry.value !== paisCorrespondencia) {
          setValue("paisCorrespondencia", matchedCountry.value);
        }
      }
    };

    normalizarPais();
  }, [watch("paisCorrespondencia"), countries, setValue]);

  // 🔥 Normalizar `departamentoNacimiento` y `departamentoCorrespondencia`
  useEffect(() => {
    const normalizarDepartamento = (campo: "departamentoNacimiento" | "departamentoCorrespondencia") => {
      const departamentoSeleccionado = watch(campo);
      if (departamentoSeleccionado && typeof departamentoSeleccionado === "string") {
        const matchedDepartamento = departamentos?.find(
          (d) => d.value.toLowerCase() === departamentoSeleccionado.toLowerCase()
        );
        if (matchedDepartamento && matchedDepartamento.value !== departamentoSeleccionado) {
          setValue(campo, matchedDepartamento.value);
        }
      }
    };

    normalizarDepartamento("departamentoNacimiento");
    normalizarDepartamento("departamentoCorrespondencia");
  }, [watch("departamentoNacimiento"), watch("departamentoCorrespondencia"), departamentos, setValue]);

  if (isLoadingCountries || isLoadingDepartamentos) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los países</p>;

  const datosPersonalesFormConfiguration = datosPersonalesFormConfig(countries || [], departamentos || []);

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Datos Personales
      </Typography>

      {datosPersonalesFormConfiguration.map((fila, rowIndex) => (
        <AutoGridRow key={rowIndex} rowSpacing={2}>
          {fila.map((campo) =>
            campo.name === "paisCorrespondencia" || campo.name === "paisNacimiento" ? (
              <CountrySelect key={campo.name} name={campo.name} control={control} />
            ) : campo.name === "departamentoCorrespondencia" ? (
              <DepartamentoSelect key={campo.name} name={campo.name} control={control} selectedCountry={paisCorrespondencia} />
            ) : campo.name === "departamentoNacimiento" ? (
              <DepartamentoSelect key={campo.name} name={campo.name} control={control} selectedCountry={paisNacimiento} />
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
