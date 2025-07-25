import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // light blue
    },
    secondary: {
      main: "#f48fb1", // pink accent
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: grey[400],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
      textTransform: "uppercase",
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
          boxShadow: "none",
          overlay: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "6px 12px",
        },
        containedPrimary: {
          color: "#fff",
          backgroundColor: "transparent",
          border: "solid 1px #fff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});

export default theme;
