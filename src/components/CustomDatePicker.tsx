import React from 'react';
import dayjs from 'dayjs';
import "@utils/configureDayjs";
import { DatePicker } from '@mui/x-date-pickers';
import { ResumeData } from '@modules/resume/interfaces/ResumeData';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  label: string;
  required?: boolean;
  errors: FieldErrors;
  control: Control<ResumeData>;
  register: UseFormRegister<any>;
  name: `datosPersonales.${keyof ResumeData["datosPersonales"]}`;
}

export const CustomDatePicker: React.FC<Props> = ({ name, label, required, control, errors }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Este campo es obligatorio" : false }}
      render={({ field }) => (
        <DatePicker
          {...field}
          format="L"
          label={label}
          value={typeof field.value === "string" ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? dayjs(date).format("YYYY-MM-DD") : null)}
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
              error: !!errors[name],
              helperText: errors[name]?.message ? String(errors[name]?.message) : undefined
            },
          }}
        />
      )}
    />
  );
};
