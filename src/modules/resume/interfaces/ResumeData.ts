import { DatosPersonales } from "modules/resume/interfaces/DatosPersonales";

export interface ResumeData {
  datosPersonales: DatosPersonales;
  updateDatosPersonales: (datos: Partial<DatosPersonales>) => void;
}
