import {
  sexoOptions,
  paisOptions,
  municipioOptions,
  departamentoOptions,
  nacionalidadOptions,
  tipoDocumentoOptions,
  tipoLibretaMilitarOptions,
} from '@utils/datosPersonalesSelectOptions';

interface CampoBase {
  label: string;
  name: string;
}

interface CampoTexto extends CampoBase {
  type: 'text';
}

interface CampoSelect extends CampoBase {
  type: 'select';
  options: { value: string; label: string }[];
}

interface CampoFecha extends CampoBase {
  type: 'date';
}

export type CampoFormulario = CampoTexto | CampoSelect | CampoFecha;

export const datosPersonalesCampos: CampoFormulario[] = [
  { label: 'Primer Apellido', name: 'primerApellido', type: 'text' },
  { label: 'Segundo Apellido', name: 'segundoApellido', type: 'text' },
  { label: 'Nombres', name: 'nombres', type: 'text' },
  { label: 'Número de Documento', name: 'numeroDocumento', type: 'text' },
  { label: 'Sexo', name: 'sexo', type: 'select', options: sexoOptions },
  { label: 'Tipo de Documento', name: 'tipoDocumento', type: 'select', options: tipoDocumentoOptions },
  { label: 'Nacionalidad', name: 'nacionalidad', type: 'select', options: nacionalidadOptions },
  { label: 'Fecha de Nacimiento', name: 'fechaNacimiento', type: 'date' },
  { label: 'País de Nacimiento', name: 'paisNacimiento', type: 'select', options: paisOptions },
  { label: 'Departamento de Nacimiento', name: 'departamentoNacimiento', type: 'select', options: departamentoOptions },
  { label: 'Municipio de Nacimiento', name: 'municipioNacimiento', type: 'select', options: municipioOptions },
  { label: 'Tipo de Libreta Militar', name: 'tipoLibretaMilitar', type: 'select', options: tipoLibretaMilitarOptions },
  { label: 'Número de Libreta Militar', name: 'numeroLibretaMilitar', type: 'text' },
  { label: 'Distrito Militar', name: 'distritoMilitar', type: 'text' },
  { label: 'Dirección de Correspondencia', name: 'direccionCorrespondencia', type: 'text' },
  { label: 'País de Correspondencia', name: 'paisCorrespondencia', type: 'select', options: paisOptions },
  { label: 'Departamento de Correspondencia', name: 'departamentoCorrespondencia', type: 'select', options: departamentoOptions },
  { label: 'Municipio de Correspondencia', name: 'municipioCorrespondencia', type: 'select', options: municipioOptions },
  { label: 'Teléfono', name: 'telefono', type: 'text' },
  { label: 'Email', name: 'email', type: 'text' }
];
