import { get } from 'lodash';
import { TextField, MenuItem } from '@mui/material';
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue, FieldValues, PathValue } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: string;
}

interface Props<T extends FieldValues> {
  name: string;
  label: string;
  required?: boolean;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  options: SelectOption[];
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
}

export function CustomSelect<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  options,
  required,
  watch,
  setValue,
}: Props<T>) {
  const selectedValue = watch(name as any) ?? '';

  return (
    <TextField
      select
      fullWidth
      size="small"
      label={label}
      variant="outlined"
      error={Boolean(get(errors, name))}
      helperText={String(get(errors, `${name}.message`) ?? '')}
      {...register(name as any, {
        required: required ? `${label} es obligatorio` : false,
      })}
      value={options.length > 0 ? selectedValue : ''}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(name as any, newValue as PathValue<T, any>, { shouldValidate: true });
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
