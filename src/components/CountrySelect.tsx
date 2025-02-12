import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import useCountries from "@hooks/useCountries";

interface Props {
  name: string;
  control: any;
}

const CountrySelect: React.FC<Props> = ({ name, control }) => {
  const { data: countries, isLoading, error } = useCountries();
  const theme = useTheme(); // 🔥 Obtiene el tema de MUI

  if (isLoading) return <p>Cargando países...</p>;
  if (error) return <p>Error al cargar los países</p>;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={countries}
          placeholder="Selecciona un país..."
          isClearable
          isSearchable
          getOptionLabel={(e) => e.label} // Muestra nombre + bandera
          getOptionValue={(e) => e.value} // Almacena solo el value
          value={countries?.find((c) => c.value === field.value) || null} // 🔥 Asegura que el valor sea un objeto válido
          onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : "")} // 🔥 Guarda solo el value
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
              backgroundColor: state.isFocused
                ? theme.palette.action.hover
                : "transparent",
              color: theme.palette.text.primary,
            }),
            singleValue: (base) => ({
              ...base,
              color: theme.palette.text.primary,
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: theme.palette.background.paper,
            }),
          }}
        />
      )}
    />
  );
};

export default CountrySelect;
