import { create } from 'zustand';
import { EstadoHojaDeVida } from '@interfaces/HojaDeVida';

export const useHojaDeVidaStore = create<EstadoHojaDeVida>(set => ({
  datosPersonales: {
    primerApellido: '',
    segundoApellido: '',
    nombres: '',
    tipoDocumento: '',
    numeroDocumento: '',
    sexo: '',
    nacionalidad: '',
    pais: '',
    fechaNacimiento: '',
    tipoLibretaMilitar: '',
    numeroLibretaMilitar: '',
    distritoMilitar: '',
    diaNacimiento: '',
    mesNacimiento: '',
    anioNacimiento: '',
    paisNacimiento: '',
    departamentoNacimiento: '',
    municipioNacimiento: '',
    direccionCorrespondencia: '',
    paisCorrespondencia: '',
    departamentoCorrespondencia: '',
    municipioCorrespondencia: '',
    telefono: '',
    email: ''
  },

  setDatosPersonales: (campo, valor) =>
    set(state => ({
      datosPersonales: { ...state.datosPersonales, [campo]: valor }
    }))
}));
