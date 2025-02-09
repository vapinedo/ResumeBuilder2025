import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { DatosPersonales } from '@interfaces/HojaDeVida';
import { useHojaDeVidaStore } from '@store/useHojaDeVidaStore';

export const useDatosPersonalesForm = () => {
  const { setDatosPersonales } = useHojaDeVidaStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    syncGlobalState(storedResume);
    reset(storedResume);
  }, [storedResume, setDatosPersonales, reset]);

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const onSubmit = (data: DatosPersonales) => {
    try {
      syncGlobalState(data);

      localStorage.setItem('datosPersonales', JSON.stringify(data));
      console.log('Datos guardados:', data);
      setOpenSnackbar(true);
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
