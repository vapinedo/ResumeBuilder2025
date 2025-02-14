import React from "react";
import useCountries from "@hooks/useCountries";
import SmartSelect from "@components/SmartSelect";

interface Props {
  name: string;
  control: any;
}

const CountrySelect: React.FC<Props> = ({ name, control }) => {
  const { data: countries, isLoading, error } = useCountries();

  return (
    <SmartSelect
      name={name}
      error={error}
      control={control}
      isLoading={isLoading}
      options={countries || []}
      placeholder="Selecciona un país..."
    />
  );
};

export default CountrySelect;
