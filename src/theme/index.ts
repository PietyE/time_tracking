import { createTheme } from '@mui/material/styles';
import {
  BackgroundColors,
  BlackColors,
  GreenColors,
  GreyColors,
  OtherColors,
} from 'constants/colors';
import type { Color } from '@mui/material';
import type { ReverseMap } from 'shared/types';

type GreyColorsValues = ReverseMap<typeof GreyColors>;
type GreyColorsKeys = keyof typeof GreyColors;

type CustomGreyColor = Record<GreyColorsKeys, GreyColorsValues>;

declare module '@mui/material/styles' {
  interface TypeBackground {
    grey: TypeBackground['paper'];
    milk: TypeBackground['paper'];
    gradient: TypeBackground['paper'];
    greyGreen: TypeBackground['paper'];
  }
  interface Palette {
    customGrey: Palette['primary'];
    black: Palette['primary'];
  }
  interface PaletteOptions {
    customGrey: Partial<CustomGreyColor>;
    black: Partial<Color & { 450: BlackColors.MAIN_OPACITY_45 }>;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface FontStyle {
    fontWeightSemiBold: number;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: GreenColors.MAIN,
      light: GreenColors.MAIN_LIGHT,
      dark: GreenColors.MAIN_DARK,
      contrastText: OtherColors.WHITE,
    },
    secondary: {
      main: GreenColors.SECONDARY,
      light: GreenColors.SECONDARY_LIGHT,
      dark: GreenColors.SECONDARY_DARK,
      contrastText: BlackColors.MAIN,
    },
    error: {
      main: OtherColors.ERROR,
    },
    background: {
      grey: BackgroundColors.GREY,
      milk: BackgroundColors.MILK,
      gradient: OtherColors.LINEAR_GRADIENT,
      greyGreen: GreenColors.LIGHT_OPACITY_15,
    },
    text: {
      disabled: GreyColors.DISABLED,
    },
    customGrey: {
      MAIN_TEXT: GreyColors.MAIN_TEXT,
      STROKE_FORM_OPACITY_20: GreyColors.STROKE_FORM_OPACITY_20,
      STROKE_OPACITY_40: GreyColors.STROKE_OPACITY_40,
      DISABLED_OPACITY_50: GreyColors.DISABLED_OPACITY_50,
      DISABLED_FORM: GreyColors.DISABLED_FORM,
      LINE: GreyColors.LINE,
      MAIN: GreyColors.MAIN,
    },
    black: {
      300: BlackColors.MAIN_OPACITY_30,
      400: BlackColors.MAIN_OPACITY_40,
      450: BlackColors.MAIN_OPACITY_45,
    },
  },
  typography: {
    fontWeightSemiBold: 800,
  },
  breakpoints: {
    values: {
      xs: 420,
      sm: 768,
      md: 1024,
      lg: 1680,
      xl: 1920,
    },
  },
  spacing: (factor: number) => `${(factor * 0.25) / 4}rem`,
});
