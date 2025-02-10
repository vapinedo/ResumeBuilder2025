import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from '@hooks/useSnackbar';
import { DatosPersonales } from '@interfaces/HojaDeVida';
import { useHojaDeVidaStore } from '@store/useHojaDeVidaStore';

export const useDatosPersonalesForm = () => {
  const { actualizarDatosPersonales } = useHojaDeVidaStore();
  const { openSnackbar, showSnackbar, handleSnackbarClose } = useSnackbar();

  const storedResume = useMemo(() => {
    const data = localStorage.getItem('datosPersonales');
    return data ? JSON.parse(data) : {};
  }, []);

  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,  // Asegurar que se exporta
    formState: { errors },
  } = useForm<DatosPersonales>({ defaultValues: storedResume });

  useEffect(() => {
    try {
      const storedResume = localStorage.getItem('datosPersonales');
      if (storedResume) {
        const parsedResume: DatosPersonales = JSON.parse(storedResume);
        actualizarDatosPersonales(parsedResume);
        reset(parsedResume);
      }
    } catch (error) {
      console.error('Error al recuperar los datos personales del localStorage:', error);
    }
  }, [actualizarDatosPersonales, reset]);

  const onSubmit = (data: DatosPersonales) => {
    try {
      actualizarDatosPersonales(data);
      localStorage.setItem('datosPersonales', JSON.stringify(data));
      showSnackbar();
    } catch (error) {
      console.error('Error guardando los datos:', error);
    }
  };

  return {
    reset,
    errors,
    watch,
    setValue,
    register,
    onSubmit,      // Exportamos onSubmit
    handleSubmit,  // Exportamos handleSubmit
    openSnackbar,
    handleSnackbarClose
  };
};
