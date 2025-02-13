import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import useDepartamentos from "@hooks/useDepartamentos";

interface Props {
  name: string;
  control: any;
}

const DepartamentoSelect: React.FC<Props> = ({ name, control }) => {
  const { departamentos, isLoading, error } = useDepartamentos();
  const theme = useTheme(); // 🔥 Obtener tema de MUI

  if (isLoading) return <p>Cargando departamentos...</p>;
  if (error) return <p>Error al cargar los departamentos</p>;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={departamentos}
          placeholder="Selecciona un departamento..."
          isClearable
          isSearchable
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          value={departamentos.find((d) => d.value === field.value) || null}
          onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : "")}
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
              backgroundColor: state.isFocused ? theme.palette.action.hover : "transparent",
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

export default DepartamentoSelect;
