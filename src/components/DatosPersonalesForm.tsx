import React, { useEffect } from "react";
import useCountries from "@hooks/useCountries";
import { AutoGridRow } from "@components/AutoGridRow";
import CountrySelect from "@components/CountrySelect";
import useDepartamentos from "@hooks/useDepartamentos";
import MunicipioSelect from "@components/MunicipioSelect";
import SectionContainer from "@containers/SectionContainer";
import { DatosPersonales } from "@interfaces/DatosPersonales";
import { RenderFormFields } from "@components/RenderFormFields";
import DepartamentoSelect from "@components/DepartamentoSelect";
import { datosPersonalesFormConfig } from "@utils/datosPersonalesFormConfig";
import { UseFormRegister, FieldErrors, UseFormSetValue, Control } from "react-hook-form";

interface Props {
  watch: any;
  control: Control<DatosPersonales>;
  errors: FieldErrors<DatosPersonales>;
  register: UseFormRegister<DatosPersonales>;
  setValue: UseFormSetValue<DatosPersonales>;
}

export const DatosPersonalesForm: React.FC<Props> = ({ register, errors, setValue, watch, control }) => {
  const { data: countries, isLoading: isLoadingCountries, error } = useCountries();
  const { departamentos, isLoading: isLoadingDepartamentos } = useDepartamentos();

  const paisNacimiento = watch("paisNacimiento") || "";
  const paisCorrespondencia = watch("paisCorrespondencia") || "";
  const departamentoNacimiento = watch("departamentoNacimiento") || "";
  const departamentoCorrespondencia = watch("departamentoCorrespondencia") || "";

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

  useEffect(() => {
    const sexoSeleccionado = watch("sexo");
  
    if (sexoSeleccionado !== "M") {
      setValue("tipoLibretaMilitar", "");
      setValue("numeroLibretaMilitar", "");
      setValue("distritoMilitar", "");
    }
  }, [watch("sexo"), setValue]);

  if (isLoadingCountries || isLoadingDepartamentos) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los países</p>;

  const datosPersonalesFormConfiguration = datosPersonalesFormConfig(countries || [], departamentos || []);

  return (
    <SectionContainer title="Datos Personales">
      {datosPersonalesFormConfiguration.map((fila, rowIndex) => (
        <AutoGridRow key={rowIndex} rowSpacing={2}>
          {fila.map((campo) =>
            campo.name === "paisCorrespondencia" || campo.name === "paisNacimiento" ? (
              <CountrySelect key={campo.name} name={campo.name} control={control} />
            ) : campo.name === "departamentoCorrespondencia" ? (
              <DepartamentoSelect key={campo.name} name={campo.name} control={control} selectedCountry={paisCorrespondencia} />
            ) : campo.name === "departamentoNacimiento" ? (
              <DepartamentoSelect key={campo.name} name={campo.name} control={control} selectedCountry={paisNacimiento} />
            ) : campo.name === "municipioCorrespondencia" ? (
              <MunicipioSelect key={campo.name} name={campo.name} control={control} selectedDepartamento={departamentoCorrespondencia} />
            ) : campo.name === "municipioNacimiento" ? (
              <MunicipioSelect key={campo.name} name={campo.name} control={control} selectedDepartamento={departamentoNacimiento} />
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
    </SectionContainer>
  );
};
