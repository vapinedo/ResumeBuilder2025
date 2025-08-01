import React from 'react';
import { Button, Grid } from '@mui/material';

interface FormButtonsProps {
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: (data: any) => void;
  onGeneratePdf: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({ handleSubmit, onSubmit, onGeneratePdf }) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end" sx={{ marginBottom: 3 }}>
      <Grid item>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Grid>

      <Grid item>
        <Button color="success" variant="contained" onClick={onGeneratePdf}>
          Generar PDF
        </Button>
      </Grid>
    </Grid>
  );
};
