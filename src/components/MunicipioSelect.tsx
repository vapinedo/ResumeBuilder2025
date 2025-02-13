import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import useMunicipios from "@hooks/useMunicipios";

interface Props {
  name: string;
  control: any;
  selectedDepartamento: string; // 🔥 Recibimos el departamento seleccionado
}

const MunicipioSelect: React.FC<Props> = ({ name, control, selectedDepartamento }) => {
  const { municipios, isLoading, error } = useMunicipios(selectedDepartamento);
  const theme = useTheme();

  if (isLoading) return <p>Cargando municipios...</p>;
  if (error) return <p>Error al cargar los municipios</p>;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={municipios}
          placeholder="Selecciona un municipio..."
          isClearable
          isSearchable
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          value={municipios.find((m) => m.value === field.value) || null}
          onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : "")}
          isDisabled={!selectedDepartamento} // 🔥 Deshabilitar si no hay departamento seleccionado
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              "&:hover": { borderColor: theme.palette.primary.main },
              boxShadow: "none",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? theme.palette.action.hover : theme.palette.background.paper,
              color: theme.palette.text.primary,
            }),
            singleValue: (base) => ({
              ...base,
              color: theme.palette.text.primary,
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: theme.palette.background.paper, // 🔥 Asegura un fondo sólido
              zIndex: 9999, // 🔥 Evita que se superponga con otros elementos
            }),
          }}          
        />
      )}
    />
  );
};

export default MunicipioSelect;
