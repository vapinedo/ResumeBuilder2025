import { ResumeData } from 'feature/resume/interfaces/ResumeData';

export const ResumeDataInitValues = (): ResumeData => ({
  datosPersonales: {
    sexo: '',
    email: '',
    nombres: '',
    telefono: '',
    tipoDocumento: '',
    primerApellido: '',
    paisNacimiento: '',
    segundoApellido: '',
    numeroDocumento: '',
    fechaNacimiento: '',
    distritoMilitar: '',
    tipoLibretaMilitar: '',
    paisCorrespondencia: '',
    municipioNacimiento: '',
    numeroLibretaMilitar: '',
    departamentoNacimiento: '',
    direccionCorrespondencia: '',
    municipioCorrespondencia: '',
    departamentoCorrespondencia: '',
  },
  educacionBasica: {
    educacionBasica: '',
    tituloObtenido: '',
    fechaGrado: '',
  },
  educacionSuperior: [
    {
      modalidadAcademica: '',
      semestresAprobados: '',
      graduado: '',
      tituloObtenido: '',
      tarjetProfesional: '',
      fechaGrado: '',
    },
  ],
  idiomas: [
    {
      idioma: '',
      loHabla: '',
      loLee: '',
      loEscribe: '',
    },
  ],
  experienciaLaboral: [
    {
      empresa: '',
      tipoEmpresa: '',
      paisEmpresa: '',
      departamentoEmpresa: '',
      municipioEmpresa: '',
      correoElectronico: '',
      telefonoEmpresa: '',
      fechaInicio: '',
      fechaFin: '',
      cargo: '',
      dependencia: '',
      direccionEmpresa: '',
    },
  ],
});
