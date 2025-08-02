import { createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blue[400],
    },
    background: {
      default: "#03070c",
      paper: "#151f35",
    },
    text: {
      primary: "#e3f2fd",
      secondary: "#90caf9",
    },
    error: {
      main: red.A200,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 300,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 800,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#050e17",
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
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});

export default theme;
