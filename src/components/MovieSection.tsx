import { Box, Typography } from "@mui/material";
import type React from "react";

type MovieSectionProps = {
  title: string;
  children: React.ReactNode;
};

const MovieSection: React.FC<MovieSectionProps> = ({ title, children }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography component="h2" variant="h6" sx={{ my: 1 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default MovieSection;
