import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#675fed",
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    error: {
      main: "#FF5B6B"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
