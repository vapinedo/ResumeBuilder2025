import React from 'react';
import { Paper, Typography } from '@mui/material';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const SectionContainer: React.FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 3,
        marginBottom: 3,
        borderRadius: '7px',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ marginBottom: '20px' }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
