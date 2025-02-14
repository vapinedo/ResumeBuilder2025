import React from "react";
import useMunicipios from "@hooks/useMunicipios";
import SmartSelect from "@components/SmartSelect";

interface Props {
  name: string;
  control: any;
  selectedDepartamento: string;
}

const MunicipioSelect: React.FC<Props> = ({ name, control, selectedDepartamento }) => {
  const { municipios, isLoading, error } = useMunicipios(selectedDepartamento);

  return (
    <SmartSelect
      name={name}
      error={error}
      control={control}
      isLoading={isLoading}
      options={municipios || []}
      isDisabled={!selectedDepartamento}
      placeholder="Selecciona un municipio..."
    />
  );
};

export default MunicipioSelect;
