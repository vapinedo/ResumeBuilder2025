import React from 'react';
import { fillPdf } from '@utils/pdfHelper';
import { Button, Grid } from '@mui/material';
import { getLocalStorageItem } from '@utils/storage.helper';
import { ResumeData } from '@modules/resume/interfaces/ResumeData';

interface FormButtonsProps {
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: (data: any) => void;
}

const STORAGE_KEY = 'resumeForm';

export const FormButtons: React.FC<FormButtonsProps> = ({ handleSubmit, onSubmit }) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end" sx={{ marginBottom: 3 }}>
      <Grid item>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Grid>

      <Grid item>
        <Button
          color="success"
          variant="contained"
          onClick={async () => {
            const storedData = getLocalStorageItem<ResumeData>(STORAGE_KEY);
            if (storedData) {
              const pdfUrl = await fillPdf(storedData);
              window.open(pdfUrl, '_blank');
            } else {
              console.log('No hay datos para generar el PDF');
            }
          }}
        >
          Generar PDF
        </Button>
      </Grid>
    </Grid>
  );
};
