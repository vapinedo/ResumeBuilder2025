import dayjs from 'dayjs';
import 'dayjs/locale/es';
import updateLocale from 'dayjs/plugin/updateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

dayjs.locale('es');

dayjs.updateLocale('es', {
  formats: {
    L: 'DD/MM/YYYY'
  }
});

export default dayjs;
