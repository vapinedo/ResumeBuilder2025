import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

interface Option {
  label: string;
  value: string;
}

interface Props {
  error?: any;
  name: string;
  control: any;
  options: Option[];
  placeholder: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const SmartSelect: React.FC<Props> = ({ name, control, options, placeholder, isLoading, error, isDisabled }) => {
  const theme = useTheme();

  if (isLoading) return <p>Cargando {placeholder.toLowerCase()}...</p>;
  if (error) return <p>Error al cargar {placeholder.toLowerCase()}</p>;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          placeholder={placeholder}
          isClearable
          isSearchable
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          value={options.find((opt) => opt.value === field.value) || null}
          onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : "")}
          isDisabled={isDisabled}
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
              backgroundColor: theme.palette.background.paper,
              zIndex: 9999,
            }),
          }}
        />
      )}
    />
  );
};

export default SmartSelect;
