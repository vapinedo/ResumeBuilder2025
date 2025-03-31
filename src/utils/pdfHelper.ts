import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { COORDINATES } from '../constants/pdfCoordinates';
import { ResumeData } from 'modules/resume/interfaces/ResumeData';

interface DrawTextOptions {
  text?: string;
  x: number;
  y: number;
  caps?: boolean;
  size?: number;
}

class PDFGenerator {
  private page: any;
  private font: any;

  constructor(page: any, font: any) {
    this.page = page;
    this.font = font;
  }

  private drawText({ text, x, y, caps = true, size = 10 }: DrawTextOptions): void {
    const safeText = text ? (caps ? text.toUpperCase() : text) : '';
    this.page.drawText(safeText, { x, y, size, font: this.font, color: rgb(0, 0, 0) });
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
    if (datosPersonales.paisNacimiento in COORDINATES.datosPersonales.nacionalidad) {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.nacionalidad[
          datosPersonales.paisNacimiento as keyof typeof COORDINATES.datosPersonales.nacionalidad
        ],
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
    this.drawText({ text: datosPersonales.telefono, ...COORDINATES.datosPersonales.contacto.telefono });
    this.drawText({ text: datosPersonales.email, ...COORDINATES.datosPersonales.contacto.email, caps: false, size: 8 });
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

  public async fillPdf(resumeData: ResumeData): Promise<string> {
    const pdfUrl = '/FormatoUnicoHojaVida.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const generator = new PDFGenerator(page, font);
    generator.fillPersonalInfo(resumeData.datosPersonales);
    generator.fillEducacionBasica(resumeData.educacionBasica);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }
}

export const fillPdf = async (resumeData: ResumeData): Promise<string> => {
  const generator = new PDFGenerator(null, null);
  return generator.fillPdf(resumeData);
};
