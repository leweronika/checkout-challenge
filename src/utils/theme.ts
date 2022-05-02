import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Theme {
    [key: string]: any;
  }
  
  interface ThemeOptions {
    [key: string]: any;
  }
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#0c1142",
    },
    secondary: {
      main: "#2bd4db",
      contrastText: "#0c1142",
      light: "#ffffc8",
    },
    background: {
      default: "#f8f8f8",
      paper: "#fff"
    },
    text: {
      primary: "#0c1142",
      secondary: "#494d72",
    },
    action: {
      disabledBackground: "#868686",
      disabled: "#0c1142",
    },
  },
});

const responsiveFontTheme = responsiveFontSizes(theme);

export default responsiveFontTheme;
