import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { DatosPersonales } from '@interfaces/HojaDeVida';
import { useHojaDeVidaStore } from '@store/useHojaDeVidaStore';

export const useDatosPersonalesForm = () => {
  const { setDatosPersonales } = useHojaDeVidaStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    Object.keys(storedResume).forEach(key => {
      setDatosPersonales(key as keyof DatosPersonales, storedResume[key]);
    });

    reset(storedResume);
  }, [storedResume, setDatosPersonales, reset]);

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const onSubmit = (data: DatosPersonales) => {
    try {
      Object.keys(data).forEach(key => {
        setDatosPersonales(key as keyof DatosPersonales, data[key as keyof DatosPersonales]);
      });

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
