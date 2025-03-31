import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from '@hooks/useSnackbar';
import { FormButtons } from '@components/FormButtons';
import { ResumeData } from '@modules/resume/interfaces/ResumeData';
import { IdiomasForm } from '@modules/resume/components/IdomasForm';
import { SnackbarNotification } from '@components/SnackbarNotification';
import { ResumeDataInitValues } from '@modules/resume/utils/resumeData.helper';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/storage.helper';
import { DatosPersonalesForm } from '@modules/resume/components/DatosPersonalesForm';
import { EducacionBasicaForm } from '@modules/resume/components/EducacionBasicaForm';
import { EducacionSuperiorForm } from '@modules/resume/components/EducacionSuperiorForm';

const STORAGE_KEY = 'resumeForm';

const FORM_CONFIG = {
  defaultValues: ResumeDataInitValues(),
};

export const ResumeForm: React.FC = () => {
  const { openSnackbar, showSnackbar, handleSnackbarClose } = useSnackbar();
  const {
    reset,
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeData>(FORM_CONFIG);

  useEffect(() => {
    const storedData = getLocalStorageItem<ResumeData>(STORAGE_KEY);
    if (storedData !== null) {
      reset(storedData, { keepErrors: true });
    }
  }, [reset]);

  const onSubmit = (formData: ResumeData) => {
    console.log('holaaaaaaaaaaaaaaaaaaaa');
    try {
      console.log('Guardando datos personales:', formData);
      setLocalStorageItem(STORAGE_KEY, formData);
      showSnackbar();
    } catch (error) {
      console.error('Error guardando los datos:', error);
    }
  };

  const onError = (errors: any) => {
    console.log('Errores detectados:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />

      <DatosPersonalesForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <EducacionBasicaForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <EducacionSuperiorForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <IdiomasForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />

      <SnackbarNotification
        severity="success"
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Datos guardados correctamente"
      />
    </form>
  );
};
