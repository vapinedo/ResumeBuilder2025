import React from 'react';
import dayjs from 'dayjs';
import { get } from 'lodash';
import 'shared/utils/configureDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import {
  DatosPersonales,
  EducacionBasica,
  EducacionSuperior,
  ExperienciaLaboral,
  ResumeData,
} from 'feature/resume/interfaces/ResumeData';

interface Props {
  label: string;
  required?: boolean;
  control: Control<ResumeData>;
  register: UseFormRegister<any>;
  errors: FieldErrors<ResumeData>;
  name:
    | keyof ResumeData
    | `datosPersonales.${keyof DatosPersonales}`
    | `educacionBasica.${keyof EducacionBasica}`
    | `educacionSuperior.${number}.${keyof EducacionSuperior}`
    | `experienciaLaboral.${number}.${keyof ExperienciaLaboral}`;
}

export const CustomDatePicker: React.FC<Props> = (props) => {
  const { name, label, required, control, errors } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'Este campo es obligatorio' : false }}
      render={({ field }) => (
        <DatePicker
          {...field}
          format="L"
          label={label}
          value={typeof field.value === 'string' ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null)}
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
              error: Boolean(get(errors, name)),
              helperText: get(errors, `${name}.message`, null),
            },
          }}
        />
      )}
    />
  );
};
