import { ResumeData } from "@modules/resume/interfaces/ResumeData";

export const ResumeDataInitValues = (): ResumeData => ({
  datosPersonales: {
    sexo: "",
    email: "",
    nombres: "",
    telefono: "",
    tipoDocumento: "",
    primerApellido: "",
    paisNacimiento: "",
    segundoApellido: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    distritoMilitar: "",
    tipoLibretaMilitar: "",
    paisCorrespondencia: "",
    municipioNacimiento: "",
    numeroLibretaMilitar: "",
    departamentoNacimiento: "",
    direccionCorrespondencia: "",
    municipioCorrespondencia: "",
    departamentoCorrespondencia: "",
  },
  formacionAcademica: {
    educacionBasica: "",
    tituloObtenido: "",
    fechaGrado: "",
  }
});