import React from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "@hooks/useSnackbar";
import { FormButtons } from "@components/FormButtons";
import { ResumeData } from "@modules/resume/interfaces/ResumeData";
import { SnackbarNotification } from "@components/SnackbarNotification";
import { ResumeDataInitValues } from "@modules/resume/utils/resumeData.helper";
import { getLocalStorageItem, setLocalStorageItem } from "@utils/storage.helper";
import { DatosPersonalesForm } from "@modules/resume/components/DatosPersonalesForm";

const STORAGE_KEY = "resumeForm";

const storedData = getLocalStorageItem<ResumeData>(STORAGE_KEY);

const FORM_CONFIG = {
  defaultValues: ResumeDataInitValues()
};

export const ResumeForm: React.FC = () => {
  const { openSnackbar, showSnackbar, handleSnackbarClose } = useSnackbar();
  const { control, handleSubmit, register, setValue, watch, formState } = useForm<ResumeData>(FORM_CONFIG);
  const { errors, isValid } = formState;

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

      {Object.keys(errors).length > 0 && (
        <p style={{ color: "red" }}>Por favor, revisa los campos obligatorios.</p>
      )}

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
