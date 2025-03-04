import { useQuery } from '@tanstack/react-query';
import { SelectOption } from '@components/CustomSelect';

const CACHE_DURATION_ONE_HOUR = 1000 * 60 * 60; 

const sortAZCountries = (countries: SelectOption[]): SelectOption[] => {
  return countries.sort((a, b) => a.value.localeCompare(b.value));
};

const fetchCountries = async (): Promise<SelectOption[]> => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  if (!response.ok) throw new Error('Error al obtener listado de países');
  const data = await response.json();

  const countries = data.map((country: any) => ({
    value: country.name.common,
    label: `${country.name.common} ${country.flag}`
  }));

  return sortAZCountries(countries);
}

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    staleTime: CACHE_DURATION_ONE_HOUR,
    queryFn: fetchCountries,
  });
}