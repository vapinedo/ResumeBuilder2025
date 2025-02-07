import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español
import customParseFormat from 'dayjs/plugin/customParseFormat';
import updateLocale from 'dayjs/plugin/updateLocale';

// Agrega los plugins que necesitas
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

// Configura el idioma y el formato de fecha predeterminado
dayjs.locale('es', {
  formats: {
    L: 'YYYY-MM-DD' // Formato de fecha por defecto
  }
});

export default dayjs;
