import { useEffect, useState } from "react";

interface Departamento {
  value: string;
  label: string;
}

const useDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await fetch("/departamentos_municipios_colombia.json"); // Ruta local del JSON

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("El formato de los datos no es un array.");
        }

        // Convertir los datos en el formato { value, label }
        const formattedDepartamentos = data.map((item: any) => ({
          value: item.departamento,
          label: item.departamento,
        }));

        setDepartamentos(formattedDepartamentos);
      } catch (err) {
        console.error("Error al cargar los departamentos:", err);
        setError("Error al cargar los departamentos. Verifica que el archivo JSON sea accesible.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartamentos();
  }, []);

  return { departamentos, isLoading, error };
};

export default useDepartamentos;
