import React from "react";
import { Paper, Typography } from "@mui/material";

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ title, children }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        marginBottom: 3,
        borderRadius: "7px",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

export default SectionContainer;
