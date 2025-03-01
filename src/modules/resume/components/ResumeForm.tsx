import React from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "@hooks/useSnackbar";
import { FormButtons } from "@components/FormButtons";
import { ResumeData } from "@modules/resume/interfaces/ResumeData";
import { SnackbarNotification } from "@components/SnackbarNotification";
import { ResumeDataInitValues } from "@modules/resume/utils/resumeData.helper";
import { DatosPersonalesFormulario } from "@modules/resume/components/DatosPersonalesFormulario";

export const ResumeForm: React.FC = () => {
  const { openSnackbar, showSnackbar, handleSnackbarClose } = useSnackbar();
  const { control, handleSubmit, register, setValue, watch, formState: { errors } } =
    useForm<ResumeData>({
      defaultValues: ResumeDataInitValues()
    });

  const onSubmit = (formData: ResumeData) => {
    // try {
    //   updateDatosPersonales(data);
    //   localStorage.setItem("datosPersonales", JSON.stringify(data));
    //   showSnackbar();
    // } catch (error) {
    //   console.error("Error guardando los datos:", error);
    // }
    console.log('form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />
      
      <DatosPersonalesFormulario
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
