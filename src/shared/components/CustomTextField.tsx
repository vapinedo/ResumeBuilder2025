import { get } from 'lodash';
import { TextField } from '@mui/material';
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: string;
  type?: string;
  label: string;
  required?: boolean;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}

export function CustomTextField<T extends FieldValues>({
  label,
  name,
  errors,
  register,
  type = 'text',
  required = false,
}: Props<T>) {
  return (
    <TextField
      fullWidth
      type={type}
      size="small"
      label={label}
      variant="outlined"
      error={Boolean(get(errors, name))}
      helperText={String(get(errors, `${name}.message`) ?? '')}
      {...register(name as any, required ? { required: `${label} es obligatorio` } : undefined)}
    />
  );
}
