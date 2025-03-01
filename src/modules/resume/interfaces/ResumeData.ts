export interface DatosPersonales {
  sexo: string;
  email: string;
  nombres: string;
  telefono: string;
  tipoDocumento: string;
  primerApellido: string;
  paisNacimiento: string;
  segundoApellido: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  distritoMilitar: string;
  tipoLibretaMilitar: string;
  paisCorrespondencia: string;
  municipioNacimiento: string;
  numeroLibretaMilitar: string;
  departamentoNacimiento: string;
  direccionCorrespondencia: string;
  municipioCorrespondencia: string;
  departamentoCorrespondencia: string;
}

export interface ResumeData {
  datosPersonales: DatosPersonales;
  // updateDatosPersonales: (datos: Partial<DatosPersonales>) => void;
}
