import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles/createTypography' {
  interface FontStyle {
    fontWeightSemiBold: number;
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
  typography: {
    fontWeightSemiBold: 800,
  },
  breakpoints: {
    values: {
      xs: 480,
      sm: 768,
      md: 1024,
      lg: 1680,
      xl: 1920,
    },
  },
  spacing: (factor: number) => `${(factor * 0.25) / 4}rem`,
});
