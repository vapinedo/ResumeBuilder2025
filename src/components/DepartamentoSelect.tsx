import React from "react";
import SmartSelect from "@components/SmartSelect";
import useDepartamentos from "@hooks/useDepartamentos";

interface Props {
  name: string;
  control: any;
  selectedCountry: string;
}

const DepartamentoSelect: React.FC<Props> = ({ name, control, selectedCountry }) => {
  const { departamentos, isLoading, error } = useDepartamentos();

  return (
    <SmartSelect
      name={name}
      error={error}
      control={control}
      isLoading={isLoading}
      placeholder="Selecciona un departamento..."
      isDisabled={selectedCountry !== "Colombia"}
      options={selectedCountry === "Colombia" ? departamentos : []}
    />
  );
};

export default DepartamentoSelect;
