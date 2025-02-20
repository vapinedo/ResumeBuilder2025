import { DatosPersonales } from "@interfaces/DatosPersonales";

export interface ResumeData {
  datosPersonales: DatosPersonales;
  updateDatosPersonales: (datos: Partial<DatosPersonales>) => void;
}
