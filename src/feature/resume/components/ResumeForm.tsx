import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Resume } from '@core/models/Resume';
import { useSnackbar } from '@shared/hooks/useSnackbar';
import { fillPdf } from '@feature/resume/utils/pdfGenerator';
import { FormButtons } from '@shared/components/FormButtons';
import { IdiomasForm } from '@feature/resume/components/IdiomasForm';
import { ResumeDataInitValues } from '@feature/resume/utils/resumeData.helper';
import { DatosPersonalesForm } from '@feature/resume/components/DatosPersonalesForm';
import { EducacionBasicaForm } from '@feature/resume/components/EducacionBasicaForm';
import { setLocalStorageItem, getLocalStorageItem } from '@shared/utils/localStorage';
import { EducacionSuperiorForm } from '@feature/resume/components/EducacionSuperiorForm';
import { ExperienciaLaboralForm } from '@feature/resume/components/ExperienciaLaboralForm';

const STORAGE_KEY = 'resumeForm';

const FORM_CONFIG = {
  defaultValues: ResumeDataInitValues(),
};

const ResumeForm: React.FC = () => {
  const { openSnackbar, showSnackbar } = useSnackbar();
  const {
    reset,
    watch,
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Resume>(FORM_CONFIG);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const id = 'TU_ID_DOCUMENTO_AQUI'; // Cambia esto por el ID real (puedes pasarlo como prop, ruta, etc)
  //     const data = await getResumeById(id);
  //     if (data) {
  //       reset(data, { keepErrors: true });
  //     }
  //   };

  //   fetchData();
  // }, [reset]);

  useEffect(() => {
    const savedData = getLocalStorageItem<Resume>(STORAGE_KEY);
    if (savedData) {
      reset(savedData);
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      setLocalStorageItem(STORAGE_KEY, value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (formData: Resume) => {
    console.log('resume', formData);
    // try {
    //   console.log('Guardando datos personales:', formData);
    //   // setLocalStorageItem(STORAGE_KEY, formData);
    //   const id = await createResume(formData);
    //   console.log('Documento guardado con ID:', id);
    //   showSnackbar();
    // } catch (error) {
    //   console.error('Error guardando los datos:', error);
    // }
  };

  const onGeneratePdf = async () => {
    const formData = getValues();
    try {
      const pdfUrl = await fillPdf(formData);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generando el PDF:', error);
    }
  };

  const onError = (errors: any) => {
    console.log('Errores detectados:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} onGeneratePdf={onGeneratePdf} />

      <DatosPersonalesForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      {/* <EducacionBasicaForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <EducacionSuperiorForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <IdiomasForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <ExperienciaLaboralForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} /> */}
    </form>
  );
};

export default ResumeForm;
