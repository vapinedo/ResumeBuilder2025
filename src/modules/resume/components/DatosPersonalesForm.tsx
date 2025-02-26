import React from "react";
import useCountries from "@hooks/useCountries";
import { AutoGridRow } from "@components/AutoGridRow";
import useDepartamentos from "@hooks/useDepartamentos";
import SectionContainer from "@containers/SectionContainer";
import { useDependentSelect } from "@hooks/useDependentSelect";
import { RenderFormFields } from "@components/RenderFormFields";
import { DatosPersonales } from "@modules/resume/interfaces/DatosPersonales";
import { datosPersonalesFormConfig } from "@modules/resume/utils/datosPersonalesFormConfig";
import { UseFormRegister, FieldErrors, UseFormSetValue, Control, UseFormWatch } from "react-hook-form";

interface Props {
  watch: UseFormWatch<DatosPersonales>;
  control: Control<DatosPersonales>;
  errors: FieldErrors<DatosPersonales>;
  register: UseFormRegister<DatosPersonales>;
  setValue: UseFormSetValue<DatosPersonales>;
}

export const DatosPersonalesForm: React.FC<Props> = ({ register, errors, setValue, watch, control }) => {
  const { data: countries, isLoading: isLoadingCountries, error: errorPaises } = useCountries();
  const { data: departamentos, isLoading: isLoadingDepartamentos, error: errorDepartamentos } = useDepartamentos();

  useDependentSelect(watch, setValue, "paisCorrespondencia", "departamentoCorrespondencia");
  useDependentSelect(watch, setValue, "departamentoCorrespondencia", "municipioCorrespondencia");
  useDependentSelect(watch, setValue, "paisNacimiento", "departamentoNacimiento");
  useDependentSelect(watch, setValue, "departamentoNacimiento", "municipioNacimiento");

  // Extraer valores dependientes
  const paisNacimiento = watch("paisNacimiento") || "";
  const paisCorrespondencia = watch("paisCorrespondencia") || "";
  const departamentoNacimiento = watch("departamentoNacimiento") || "";
  const departamentoCorrespondencia = watch("departamentoCorrespondencia") || "";

  // Validaciones de carga
  if (isLoadingCountries || isLoadingDepartamentos) return <p>Cargando datos...</p>;
  if (errorPaises) return <p>Error al cargar los países</p>;
  if (errorDepartamentos) return <p>Error al cargar los departamentos</p>;

  const datosPersonalesFormConfiguration = datosPersonalesFormConfig(countries || [], departamentos || []);

  return (
    <SectionContainer title="Datos Personales">
      {datosPersonalesFormConfiguration.map((fila, rowIndex) => (
        <AutoGridRow key={rowIndex} rowSpacing={2}>
          {fila.map((campo) => (
            <RenderFormFields
              campo={campo}
              watch={watch}
              errors={errors}
              key={campo.name}
              control={control}
              register={register}
              setValue={setValue}
              paisNacimiento={paisNacimiento}
              paisCorrespondencia={paisCorrespondencia}
              departamentoNacimiento={departamentoNacimiento}
              departamentoCorrespondencia={departamentoCorrespondencia}
            />
          ))}
        </AutoGridRow>
      ))}
    </SectionContainer>
  );
};
