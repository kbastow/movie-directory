import "./App.css";
import React from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme";
import AppRoutes from "./routes/routes";
import Navigation from "./components/Navigation";
import { Container } from "@mui/material";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Navigation />
    <Container>
      <AppRoutes />
    </Container>
  </ThemeProvider>
);

export default App;
