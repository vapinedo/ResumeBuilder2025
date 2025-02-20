import React from "react";
import { FormButtons } from "@components/FormButtons";
import { DatosPersonalesForm } from "@components/DatosPersonalesForm";
import { SnackbarNotification } from "@components/SnackbarNotification";
import { useDatosPersonalesForm } from "@hooks/useDatosPersonalesForm";

export const ResumeForm: React.FC = () => {
  const { onSubmit, handleSubmit, openSnackbar, handleSnackbarClose, register, errors, setValue, watch, control } =
    useDatosPersonalesForm();

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
