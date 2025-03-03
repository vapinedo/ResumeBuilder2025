import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "@hooks/useSnackbar";
import { FormButtons } from "@components/FormButtons";
import { ResumeData } from "@modules/resume/interfaces/ResumeData";
import { SnackbarNotification } from "@components/SnackbarNotification";
import { ResumeDataInitValues } from "@modules/resume/utils/resumeData.helper";
import { getLocalStorageItem, setLocalStorageItem } from "@utils/storage.helper";
import { DatosPersonalesForm } from "@modules/resume/components/DatosPersonalesForm";

const STORAGE_KEY = "resumeForm";

const FORM_CONFIG = {
  defaultValues: ResumeDataInitValues()
};

export const ResumeForm: React.FC = () => {
  const { openSnackbar, showSnackbar, handleSnackbarClose } = useSnackbar();
  const { control, handleSubmit, register, reset, setValue, watch, formState } = useForm<ResumeData>(FORM_CONFIG);
  const { errors, isValid } = formState;

  useEffect(() => {
    const storedData = getLocalStorageItem<ResumeData>(STORAGE_KEY);
    if (storedData) {
      reset(storedData);
    }
  }, [reset]);

  const onSubmit = (formData: ResumeData) => {
    try {
      if (!isValid) {
        console.log('Formulario no válido, no se guardará.')
        return;
      }

      console.log("Guardando datos personales:", formData);
      setLocalStorageItem(STORAGE_KEY, formData);
      showSnackbar();
    } 
    catch (error) {
      console.error("Error guardando los datos:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />
      
      <DatosPersonalesForm
        watch={watch}
        errors={errors}
        control={control}
        register={register}
        setValue={setValue}
      />

      <SnackbarNotification
        severity="success"
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Datos guardados correctamente"
      />
    </form>
  );
};
