// import { ResumeRouter } from "./routers/ResumeRouter";
import { ResumeForm } from "@modules/resume/components/ResumeForm";
import { useResumeStore } from "@modules/resume/stores/useResumeStore";
import { datosPersonalesInit } from "@modules/resume/interfaces/DatosPersonales";
import type { DatosPersonales } from "@modules/resume/interfaces/DatosPersonales";
import { DatosPersonalesForm } from "@modules/resume/components/DatosPersonalesForm";
import { datosPersonalesFormConfig } from "@modules/resume/utils/datosPersonalesFormConfig";
import * as datosPersonalesSelectOptions from "@modules/resume/utils/datosPersonalesSelectOptions";

export {
  // Rutas
  // ResumeRouter,

  // Componentes principales del módulo
  ResumeForm,
  DatosPersonalesForm,

  // Estado global del módulo
  useResumeStore,

  // Utilidades y constantes
  datosPersonalesFormConfig,
  datosPersonalesSelectOptions,

  // Interfaces y funciones de interfaces
  DatosPersonales,
  datosPersonalesInit
};
