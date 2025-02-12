import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { DatosPersonales } from '@interfaces/HojaDeVida';

export const fillPdf = async (formData: DatosPersonales): Promise<string> => {
  const pdfUrl = '/FormatoUnicoHojaVida.pdf';

  // Cargar el PDF base
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Obtener la primera página
  const page = pdfDoc.getPages()[0];

  // Definir fuente en negrita
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Función reutilizable para dibujar texto en la página
  const drawText = (page: any, font: any, text: string | undefined, x: number, y: number, caps: boolean = true, size: number = 10) => {
    const safeText = text ? (caps ? text.toUpperCase() : text) : '';
    page.drawText(safeText, { x, y, size, font, color: rgb(0, 0, 0) });
  };

  console.log('datos a pdf', formData);

  // Escribir datos en el PDF
  drawText(page, font, formData.primerApellido, 64, 602);
  drawText(page, font, formData.segundoApellido, 230, 602);
  drawText(page, font, formData.nombres, 400, 602);

  // Mapeo de valores para evitar switch repetitivos
  const mapeoTipoDocumento: Record<string, [number, number]> = {
    CC: [82.5, 574],
    CE: [113.5, 574],
    PAS: [147.5, 574]
  };
  if (formData.tipoDocumento in mapeoTipoDocumento) {
    drawText(page, font, 'X', ...mapeoTipoDocumento[formData.tipoDocumento]);
  }

  drawText(page, font, formData.numeroDocumento, 185, 575);

  const mapeoSexo: Record<string, [number, number]> = {
    M: [317, 574],
    F: [341.5, 574]
  };
  if (formData.sexo in mapeoSexo) {
    drawText(page, font, 'X', ...mapeoSexo[formData.sexo]);
  }

  const mapeoNacionalidad: Record<string, [number, number]> = {
    COL: [384, 575],
    EXT: [456.7, 574]
  };
  if (formData.nacionalidad in mapeoNacionalidad) {
    drawText(page, font, 'X', ...mapeoNacionalidad[formData.nacionalidad]);
  }

  drawText(page, font, formData.pais, 478, 575);

  const mapeoLibretaMilitar: Record<string, [number, number]> = {
    primera: [146, 543.5],
    segunda: [261.5, 543.5]
  };
  if (formData.tipoLibretaMilitar in mapeoLibretaMilitar) {
    drawText(page, font, 'X', ...mapeoLibretaMilitar[formData.tipoLibretaMilitar]);
  }

  drawText(page, font, formData.numeroLibretaMilitar, 338, 545);
  drawText(page, font, formData.distritoMilitar, 500, 545);

  // Validación de `fechaNacimiento`
  if (formData.fechaNacimiento && formData.fechaNacimiento.includes('-')) {
    const [birthYear, birthMonth, birthDay] = formData.fechaNacimiento.split('-');
    drawText(page, font, birthYear.split('').join(' '), 236.5, 507, false, 11);
    drawText(page, font, birthMonth.split('').join(' '), 186.4, 507, false, 11);
    drawText(page, font, birthDay.split('').join(' '), 137.4, 507, false, 11);
  }

  drawText(page, font, formData.paisNacimiento, 118, 490.2);
  drawText(page, font, formData.departamentoNacimiento, 118, 473.5);
  drawText(page, font, formData.municipioNacimiento, 118, 455.7);

  drawText(page, font, formData.direccionCorrespondencia, 294, 508.6);
  drawText(page, font, formData.paisCorrespondencia, 320, 490);
  drawText(page, font, formData.departamentoCorrespondencia, 475, 490);
  drawText(page, font, formData.municipioCorrespondencia, 346, 473.5);

  drawText(page, font, formData.telefono, 348, 456);
  drawText(page, font, formData.email, 472, 456, false, 8);

  // Guardar y exportar el PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return url;
};
