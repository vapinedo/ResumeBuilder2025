import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "@hooks/useSnackbar";
import { useResumeStore } from "@modules/resume/stores/useResumeStore";
import { DatosPersonales } from "@modules/resume/interfaces/DatosPersonales";

export const useDatosPersonalesForm = () => {
  const { updateDatosPersonales } = useResumeStore();
  const { openSnackbar, showSnackbar, handleSnackbarClose } = useSnackbar();

  const storedResume = useMemo(() => {
    const data = localStorage.getItem("datosPersonales");
    return data ? JSON.parse(data) : {};
  }, []);

  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatosPersonales>({ defaultValues: storedResume });

  useEffect(() => {
    try {
      const storedResume = localStorage.getItem("datosPersonales");
      if (storedResume) {
        const parsedResume: DatosPersonales = JSON.parse(storedResume);
        updateDatosPersonales(parsedResume);
        reset(parsedResume);
      }
    } catch (error) {
      console.error("Error al recuperar los datos personales del localStorage:", error);
    }
  }, [updateDatosPersonales, reset]);

  const onSubmit = (data: DatosPersonales) => {
    try {
      updateDatosPersonales(data);
      localStorage.setItem("datosPersonales", JSON.stringify(data));
      showSnackbar();
    } catch (error) {
      console.error("Error guardando los datos:", error);
    }
  };

  return {
    reset,
    watch,
    errors,
    control,
    setValue,
    register,
    onSubmit,
    handleSubmit,
    openSnackbar,
    handleSnackbarClose,
  };
};
