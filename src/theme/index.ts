import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    neutral: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#009C98',
    },
    secondary: {
      main: '#125856',
    },
    neutral: {
      main: 'red',
    },
  },
});
