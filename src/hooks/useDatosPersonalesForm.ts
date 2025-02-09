import { useForm } from 'react-hook-form';
import { useSnackbar } from '@hooks/useSnackbar';
import { useEffect, useMemo, useState } from 'react';
import { DatosPersonales } from '@interfaces/HojaDeVida';
import { useHojaDeVidaStore } from '@store/useHojaDeVidaStore';

export const useDatosPersonalesForm = () => {
  const { setDatosPersonales } = useHojaDeVidaStore();
  const { openSnackbar, showSnackbar, handleSnackbarClose } = useSnackbar();

  const syncGlobalState = (datosPersonales: Partial<DatosPersonales>) => {
    Object.entries(datosPersonales).forEach(([key, value]) => {
      setDatosPersonales(key as keyof DatosPersonales, value);
    });
  };

  const storedResume = useMemo(() => {
    const data = localStorage.getItem('datosPersonales');
    return data ? JSON.parse(data) : {};
  }, []);

  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatosPersonales>({ defaultValues: storedResume });

  useEffect(() => {
    try {
      const storedResume = localStorage.getItem('datosPersonales');
      const parsedResume: DatosPersonales = storedResume ? JSON.parse(storedResume) : {};
  
      syncGlobalState(parsedResume);
      reset(parsedResume);
    } catch (error) {
      console.error('Error al recuperar los datos personales del localStorage:', error);
    }
  }, [setDatosPersonales, reset]);
  

  const onSubmit = (data: DatosPersonales) => {
    try {
      syncGlobalState(data);

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
    onSubmit,
    handleSubmit,
    openSnackbar,
    handleSnackbarClose
  };
};
