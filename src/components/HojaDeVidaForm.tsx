import React from "react";
import { FormButtons } from "@components/FormButtons";
import { DatosPersonalesForm } from "@components/DatosPersonalesForm";
import { SnackbarNotification } from "@components/SnackbarNotification";
import { useDatosPersonalesForm } from "@hooks/useDatosPersonalesForm";

export const HojaDeVidaForm: React.FC = () => {
  // 🔥 Ahora incluimos `control`
  const { onSubmit, handleSubmit, openSnackbar, handleSnackbarClose, register, errors, setValue, watch, control } =
    useDatosPersonalesForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />
      <DatosPersonalesForm
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        control={control} // 🔥 Pasamos control correctamente
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
