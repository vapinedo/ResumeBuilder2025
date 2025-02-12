import { useQuery } from '@tanstack/react-query';

interface Country {
  value: string;
  label: string;
}

const ONE_HOUR = 1000 * 60 * 60; 

const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  if (!response.ok) throw new Error('Error al obtener listado de países');
  const data = await response.json();

  return data.map((country: any) => ({
    value: country.name.common,
    label: `${country.name.common} ${country.flag}`
  }));
}

const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    staleTime: ONE_HOUR,
    queryFn: fetchCountries,
  });
}

export default useCountries;