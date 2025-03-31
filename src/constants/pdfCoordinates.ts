export const COORDINATES = {
  datosPersonales: {
    nombres: {
      primerApellido: { x: 64, y: 602 },
      segundoApellido: { x: 230, y: 602 },
      nombres: { x: 400, y: 602 },
    },
    documento: {
      tipo: {
        CC: { x: 82.5, y: 574 },
        CE: { x: 113.5, y: 574 },
        PAS: { x: 147.5, y: 574 },
      },
      numero: { x: 185, y: 575 },
    },
    sexo: {
      M: { x: 341.5, y: 574 },
      F: { x: 317, y: 574 },
    },
    nacionalidad: {
      COL: { x: 384, y: 575 },
      EXT: { x: 456.7, y: 574 },
    },
    libretaMilitar: {
      tipo: {
        primera: { x: 146, y: 543.5 },
        segunda: { x: 261.5, y: 543.5 },
      },
      numero: { x: 338, y: 545 },
      distrito: { x: 500, y: 545 },
    },
    fechaNacimiento: {
      año: { x: 236.5, y: 507 },
      mes: { x: 186.4, y: 507 },
      dia: { x: 137.4, y: 507 },
    },
    ubicacion: {
      paisNacimiento: { x: 118, y: 490.2 },
      departamentoNacimiento: { x: 118, y: 473.5 },
      municipioNacimiento: { x: 118, y: 455.7 },
    },
    correspondencia: {
      direccion: { x: 294, y: 508.6 },
      pais: { x: 320, y: 490 },
      departamento: { x: 475, y: 490 },
      municipio: { x: 346, y: 473.5 },
    },
    contacto: {
      telefono: { x: 348, y: 456 },
      email: { x: 472, y: 456 },
    },
  },
  educacionBasica: {
    educacionBasica: {
      primero: { x: 101, y: 320, size: 14 },
      segundo: { x: 118, y: 320, size: 14 },
      tercero: { x: 135, y: 320, size: 14 },
      cuarto: { x: 152, y: 320, size: 14 },
      quinto: { x: 169, y: 320, size: 14 },
      sexto: { x: 186, y: 320, size: 14 },
      septimo: { x: 203, y: 320, size: 14 },
      octavo: { x: 220, y: 320, size: 14 },
      noveno: { x: 237, y: 320, size: 14 },
      decimo: { x: 254, y: 320, size: 14 },
      undecimo: { x: 271, y: 320, size: 14 },
    },
    tituloObtenido: { x: 362, y: 350.5, size: 9 },
    fechaGrado: {
      mes: { x: 351, y: 320 },
      año: { x: 412, y: 320 },
    },
  },
  educacionSuperior: [
    {
      modalidadAcademica: { x: 0, y: 0 }, // Placeholder
      semestresAprobados: { x: 0, y: 0 }, // Placeholder
      graduado: { x: 0, y: 0 }, // Placeholder
      tituloObtenido: { x: 0, y: 0 }, // Placeholder
      fechaGrado: { x: 0, y: 0 }, // Placeholder
      tarjetProfesional: { x: 0, y: 0 }, // Placeholder
    },
  ],
  idiomas: [
    {
      idioma: { x: 0, y: 0 }, // Placeholder
      loHabla: { x: 0, y: 0 }, // Placeholder
      loLee: { x: 0, y: 0 }, // Placeholder
      loEscribe: { x: 0, y: 0 }, // Placeholder
    },
  ],
} as const;
