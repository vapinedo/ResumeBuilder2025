export interface DatosPersonales {
  primerApellido: string;
  segundoApellido: string;
  nombres: string;
  tipoDocumento: string;
  numeroDocumento: string;
  sexo: string;
  nacionalidad: string;
  pais: string;
  fechaNacimiento: string;
  tipoLibretaMilitar: string;
  numeroLibretaMilitar: string;
  distritoMilitar: string;
  paisNacimiento: string;
  departamentoNacimiento: string;
  municipioNacimiento: string;
  direccionCorrespondencia: string;
  paisCorrespondencia: string;
  departamentoCorrespondencia: string;
  municipioCorrespondencia: string;
  telefono: string;
  email: string;
}

export interface EstadoHojaDeVida {
  datosPersonales: DatosPersonales;
  actualizarDatosPersonales: (datos: Partial<DatosPersonales>) => void;
}