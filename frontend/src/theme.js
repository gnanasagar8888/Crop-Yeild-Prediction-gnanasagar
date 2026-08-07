import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32",
    },
    secondary: {
      main: "#1976D2",
    },
    background: {
      default: "#F4F6F8",
      paper: "#FFFFFF",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 45,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 8,
          marginBottom: 8,
        },
      },
    },

  },

});

export default theme;