import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'shared/hooks/useSnackbar';
import { FormButtons } from '@components/FormButtons';
import { ResumeData } from 'feature/resume/interfaces/ResumeData';
import { IdiomasForm } from 'feature/resume/components/IdiomasForm';
import { SnackbarNotification } from '@components/SnackbarNotification';
import { createResume, getResumeById } from 'core/services/firebase.service';
import { ResumeDataInitValues } from 'feature/resume/utils/resumeData.helper';
import { getLocalStorageItem, setLocalStorageItem } from 'shared/utils/storage.helper';
import { DatosPersonalesForm } from 'feature/resume/components/DatosPersonalesForm';
import { EducacionBasicaForm } from 'feature/resume/components/EducacionBasicaForm';
import { EducacionSuperiorForm } from 'feature/resume/components/EducacionSuperiorForm';
import { ExperienciaLaboralForm } from 'feature/resume/components/ExperienciaLaboralForm';

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
    const fetchData = async () => {
      const id = 'TU_ID_DOCUMENTO_AQUI'; // Cambia esto por el ID real (puedes pasarlo como prop, ruta, etc)
      const data = await getResumeById(id);
      if (data) {
        reset(data, { keepErrors: true });
      }
    };

    fetchData();
  }, [reset]);

  const onSubmit = async (formData: ResumeData) => {
    try {
      console.log('Guardando datos personales:', formData);
      setLocalStorageItem(STORAGE_KEY, formData);

      const id = await createResume(formData);
      console.log('Documento guardado con ID:', id);

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
      <ExperienciaLaboralForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />

      <SnackbarNotification
        severity="success"
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Datos guardados correctamente"
      />
    </form>
  );
};
