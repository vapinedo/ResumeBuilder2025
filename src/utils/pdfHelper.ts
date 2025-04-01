import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { COORDINATES } from '../constants/pdfCoordinates';
import { ResumeData } from 'modules/resume/interfaces/ResumeData';

interface DrawTextOptions {
  text?: string;
  x: number;
  y: number;
  caps?: boolean;
  size?: number;
  maxWidth?: number;
}

class PDFGenerator {
  private page: any;
  private font: any;

  constructor(page: any, font: any) {
    this.page = page;
    this.font = font;
  }

  private drawText({
    text,
    x,
    y,
    size = 11,
    caps = false,
    maxWidth = 200, // Ancho máximo por defecto
  }: DrawTextOptions): void {
    if (!text) return;

    const finalText = caps ? text.toUpperCase() : text;
    let fontSize = size;
    let textWidth = this.getTextWidth(finalText, fontSize);

    // Si el texto es más largo que el espacio disponible, reducimos el tamaño
    if (textWidth > maxWidth) {
      // Calculamos el factor de reducción necesario
      const reductionFactor = maxWidth / textWidth;
      fontSize = Math.max(6, Math.floor(fontSize * reductionFactor));

      // Verificamos que el texto quepa con el nuevo tamaño
      textWidth = this.getTextWidth(finalText, fontSize);
      if (textWidth > maxWidth) {
        fontSize = Math.max(6, fontSize - 0.5);
      }
    }

    this.page.setFontSize(fontSize);
    this.page.drawText(finalText, {
      x,
      y,
      color: rgb(0, 0, 0),
      font: this.font, // Aseguramos que se use la fuente en negrita
    });
  }

  private getTextWidth(text: string, fontSize: number): number {
    // Aproximación del ancho del texto basada en el tamaño de fuente
    // Factor de conversión ajustado para Helvetica (fontSize * 0.6)
    const averageCharWidth = fontSize * 0.6;
    // Ajuste adicional para caracteres especiales y espacios
    const specialChars = text.match(/[áéíóúñÁÉÍÓÚÑ\s]/g) || [];
    const normalChars = text.length - specialChars.length;
    return normalChars * averageCharWidth + specialChars.length * averageCharWidth * 1.2;
  }

  private formatPhoneNumber(phone: string): string {
    // Eliminamos cualquier carácter que no sea número
    const numbers = phone.replace(/\D/g, '');
    // Formateamos el número en grupos de 3 dígitos
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  }

  private fillPersonalInfo(datosPersonales: ResumeData['datosPersonales']): void {
    // Nombres
    this.drawText({ text: datosPersonales.primerApellido, ...COORDINATES.datosPersonales.nombres.primerApellido });
    this.drawText({ text: datosPersonales.segundoApellido, ...COORDINATES.datosPersonales.nombres.segundoApellido });
    this.drawText({ text: datosPersonales.nombres, ...COORDINATES.datosPersonales.nombres.nombres });

    // Documento
    if (datosPersonales.tipoDocumento in COORDINATES.datosPersonales.documento.tipo) {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.documento.tipo[
          datosPersonales.tipoDocumento as keyof typeof COORDINATES.datosPersonales.documento.tipo
        ],
      });
    }
    this.drawText({ text: datosPersonales.numeroDocumento, ...COORDINATES.datosPersonales.documento.numero });

    // Sexo
    if (datosPersonales.sexo in COORDINATES.datosPersonales.sexo) {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.sexo[datosPersonales.sexo as keyof typeof COORDINATES.datosPersonales.sexo],
      });
    }

    // Nacionalidad
    if (datosPersonales.paisNacimiento === 'Colombia') {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.nacionalidad.colombiana,
      });
    } else {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.nacionalidad.extranjera,
      });
      // Mostrar el nombre del país si no es Colombia
      this.drawText({
        text: datosPersonales.paisNacimiento,
        ...COORDINATES.datosPersonales.nacionalidad.paisExtranjero,
      });
    }
    this.drawText({ text: datosPersonales.paisNacimiento, ...COORDINATES.datosPersonales.ubicacion.paisNacimiento });

    // Libreta Militar
    if (datosPersonales.tipoLibretaMilitar in COORDINATES.datosPersonales.libretaMilitar.tipo) {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.libretaMilitar.tipo[
          datosPersonales.tipoLibretaMilitar as keyof typeof COORDINATES.datosPersonales.libretaMilitar.tipo
        ],
      });
    }
    this.drawText({ text: datosPersonales.numeroLibretaMilitar, ...COORDINATES.datosPersonales.libretaMilitar.numero });
    this.drawText({ text: datosPersonales.distritoMilitar, ...COORDINATES.datosPersonales.libretaMilitar.distrito });

    // Fecha de Nacimiento
    if (datosPersonales.fechaNacimiento?.includes('-')) {
      const [year, month, day] = datosPersonales.fechaNacimiento.split('-');
      this.drawText({
        text: year.split('').join(' '),
        ...COORDINATES.datosPersonales.fechaNacimiento.año,
        caps: false,
        size: 11,
      });
      this.drawText({
        text: month.split('').join(' '),
        ...COORDINATES.datosPersonales.fechaNacimiento.mes,
        caps: false,
        size: 11,
      });
      this.drawText({
        text: day.split('').join(' '),
        ...COORDINATES.datosPersonales.fechaNacimiento.dia,
        caps: false,
        size: 11,
      });
    }

    // Ubicación
    this.drawText({
      text: datosPersonales.departamentoNacimiento,
      ...COORDINATES.datosPersonales.ubicacion.departamentoNacimiento,
    });
    this.drawText({
      text: datosPersonales.municipioNacimiento,
      ...COORDINATES.datosPersonales.ubicacion.municipioNacimiento,
    });

    // Correspondencia
    this.drawText({
      text: datosPersonales.direccionCorrespondencia,
      ...COORDINATES.datosPersonales.correspondencia.direccion,
    });
    this.drawText({ text: datosPersonales.paisCorrespondencia, ...COORDINATES.datosPersonales.correspondencia.pais });
    this.drawText({
      text: datosPersonales.departamentoCorrespondencia,
      ...COORDINATES.datosPersonales.correspondencia.departamento,
    });
    this.drawText({
      text: datosPersonales.municipioCorrespondencia,
      ...COORDINATES.datosPersonales.correspondencia.municipio,
    });

    // Contacto
    this.drawText({
      text: this.formatPhoneNumber(datosPersonales.telefono),
      ...COORDINATES.datosPersonales.contacto.telefono,
    });
    this.drawText({
      text: datosPersonales.email,
      ...COORDINATES.datosPersonales.contacto.email,
      caps: false,
      size: 8,
    });
  }

  private fillEducacionBasica(educacionBasica: ResumeData['educacionBasica']): void {
    // Educación Básica - Mostrar X en la coordenada correspondiente
    if (educacionBasica.educacionBasica in COORDINATES.educacionBasica.educacionBasica) {
      this.drawText({
        text: 'X',
        ...COORDINATES.educacionBasica.educacionBasica[
          educacionBasica.educacionBasica as keyof typeof COORDINATES.educacionBasica.educacionBasica
        ],
      });
    }

    // Título Obtenido - Mostrar el valor capturado
    this.drawText({
      text: educacionBasica.tituloObtenido,
      ...COORDINATES.educacionBasica.tituloObtenido,
    });

    // Fecha de Grado
    if (educacionBasica.fechaGrado?.includes('-')) {
      const [year, month] = educacionBasica.fechaGrado.split('-');
      this.drawText({
        text: year.split('').join(' '),
        ...COORDINATES.educacionBasica.fechaGrado.año,
        caps: false,
        size: 11,
      });
      this.drawText({
        text: month.split('').join(' '),
        ...COORDINATES.educacionBasica.fechaGrado.mes,
        caps: false,
        size: 11,
      });
    }
  }

  private fillEducacionSuperior(educacionSuperior: ResumeData['educacionSuperior']): void {
    // Iteramos sobre cada bloque de educación superior
    educacionSuperior.forEach((educacion, index) => {
      const bloqueKey = `bloque${index + 1}` as keyof typeof COORDINATES.educacionSuperior;
      const coordenadas = COORDINATES.educacionSuperior[bloqueKey];

      // Título Obtenido
      this.drawText({
        text: educacion.tituloObtenido,
        ...coordenadas.tituloObtenido,
        size: 13, // Volvemos al tamaño anterior
      });

      // Fecha de Grado
      if (educacion.fechaGrado?.includes('-')) {
        const [year, month] = educacion.fechaGrado.split('-');
        // Dibujamos cada dígito del año por separado
        year.split('').forEach((digit, i) => {
          let xOffset = i * 12; // Espaciado base
          if (i === 2) {
            // Para el tercer dígito (penúltimo)
            xOffset += 2; // Añadimos un poco más de espacio
          } else if (i === 3) {
            // Para el último dígito
            xOffset += 4; // Añadimos más espacio para el último dígito
          }
          this.drawText({
            text: digit,
            x: coordenadas.fechaGrado.year.x + xOffset,
            y: coordenadas.fechaGrado.year.y,
            caps: false,
            size: 11,
          });
        });
        this.drawText({
          text: month.split('').join(' '), // Quitamos el espacio entre los dígitos del mes
          ...coordenadas.fechaGrado.mes,
          caps: false,
          size: 11,
        });
      }

      // Modalidad Académica
      this.drawText({
        text: educacion.modalidadAcademica,
        ...coordenadas.modalidad,
      });

      // Semestres Aprobados
      this.drawText({
        text: educacion.semestresAprobados,
        ...coordenadas.semestresAprobados,
      });

      // Graduado
      if (educacion.graduado === 'si' || educacion.graduado === 'no') {
        this.drawText({
          text: 'X',
          ...coordenadas.graduado[educacion.graduado],
          caps: true,
          size: 11,
        });
      }

      // Tarjeta Profesional
      this.drawText({
        text: educacion.tarjetProfesional,
        ...coordenadas.tarjetProfesional,
      });
    });
  }

  public async fillPdf(resumeData: ResumeData): Promise<string> {
    const pdfUrl = '/FormatoUnicoHojaVida.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const generator = new PDFGenerator(page, font);
    generator.fillPersonalInfo(resumeData.datosPersonales);
    generator.fillEducacionBasica(resumeData.educacionBasica);
    generator.fillEducacionSuperior(resumeData.educacionSuperior);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }
}

export const fillPdf = async (resumeData: ResumeData): Promise<string> => {
  const generator = new PDFGenerator(null, null);
  return generator.fillPdf(resumeData);
};
