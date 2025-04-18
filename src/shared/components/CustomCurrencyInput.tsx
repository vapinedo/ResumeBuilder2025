import React from 'react';
import MaskedInput from 'react-text-mask';
import { Controller, Control } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

interface CustomCurrencyInputProps extends Omit<TextFieldProps, 'name' | 'onChange' | 'value'> {
  name: string;
  label: string;
  helperText?: string;
  control: Control<any>;
}

const currencyMask = createNumberMask({
  prefix: '',
  suffix: '',
  decimalLimit: 2,
  decimalSymbol: ',',
  allowDecimal: true,
  integerLimit: null,
  allowNegative: false,
  allowLeadingZeroes: false,
  thousandsSeparatorSymbol: '.',
  includeThousandsSeparator: true,
});

const CustomCurrencyInput: React.FC<CustomCurrencyInputProps> = ({ name, control, label, helperText, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MaskedInput
          {...field}
          mask={currencyMask}
          render={(ref, props) => (
            <TextField
              fullWidth
              {...props}
              label={label}
              inputRef={ref}
              error={!!helperText}
              helperText={helperText}
              {...rest}
            />
          )}
        />
      )}
    />
  );
};

export default CustomCurrencyInput;
