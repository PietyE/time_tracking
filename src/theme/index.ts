import { createTheme } from '@mui/material/styles';
import {
  BackgroundColors,
  BlackColors,
  GreenColors,
  GreyColors,
  OtherColors,
} from 'constants/colors';
import type { Color, Shadows } from '@mui/material';

type GreyColorsValues = ReverseMap<typeof GreyColors>;
type GreyColorsKeys = keyof typeof GreyColors;

type CustomGreyColor = Record<GreyColorsKeys, GreyColorsValues>;

declare module '@mui/material/styles' {
  interface Palette {
    customGrey: Partial<CustomGreyColor>;
    black: Partial<Color & { 450: BlackColors.MAIN_OPACITY_45 }>;
  }
  interface PaletteOptions {
    customGrey: Partial<CustomGreyColor>;
    black: Partial<
      Color & { 450: BlackColors.MAIN_OPACITY_45; main: BlackColors.MAIN }
    >;
  }
  interface TypeBackground {
    grey: TypeBackground['paper'];
    milk: TypeBackground['paper'];
    gradient: TypeBackground['paper'];
    greyGreen: TypeBackground['paper'];
    lightGreen: TypeBackground['paper'];
  }
  interface TypeText {
    link: OtherColors.LINK;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    black: true;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface FontStyle {
    fontWeightSemiBold: number;
  }
}

const basicTheme = createTheme({
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
      lightGreen: GreenColors.MAIN_OPACITY_10,
    },
    text: {
      disabled: GreyColors.DISABLED,
      link: OtherColors.LINK,
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
      main: BlackColors.MAIN,
    },
  },
  shadows: [
    'none',
    '10px 10px 35px rgba(0, 0, 0, 0.1)',
    ...Array(23).fill('none'),
  ] as Shadows,
  typography: {
    fontWeightSemiBold: 600,
    fontFamily: 'Montserrat',
  },
  breakpoints: {
    values: {
      xs: 375,
      sm: 768,
      md: 1024,
      lg: 1680,
      xl: 1920,
    },
  },
  spacing: (factor: number) => `${(factor * 0.25) / 4}rem`,
});

export const theme = createTheme(basicTheme, {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${basicTheme.palette.background.grey}`,
        },
        elevation1: {
          boxShadow: 'none',
        },
        rounded: basicTheme.unstable_sx({
          borderRadius: 2,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: basicTheme.spacing(8, 16),
          textTransform: 'none',
          fontWeight: basicTheme.typography.fontWeightMedium,
          '&:hover': {
            transform: 'none',
            boxShadow: 'none',
          },
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: basicTheme.palette.primary.dark,
          },
          '&.MuiButton-containedSecondary:hover': {
            backgroundColor: basicTheme.palette.secondary.dark,
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(5px)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: basicTheme.zIndex.tooltip,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: basicTheme.unstable_sx({
          boxSizing: 'border-box',
          padding: 12,
          minHeight: 42,
          background: basicTheme.palette.common.white,
          '& fieldset': {
            border: 1,
            borderColor: basicTheme.palette.customGrey.STROKE_FORM_OPACITY_20,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 1,
            borderColor: basicTheme.palette.customGrey.STROKE_FORM_OPACITY_20,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: basicTheme.palette.primary.main,
            borderWidth: 1,
          },
        }),
        input: {
          fontWeight: 500,
          fontSize: basicTheme.typography.pxToRem(14),
          padding: 0,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          '&::placeholder': {
            color: basicTheme.palette.text.disabled,
          },
        },
        multiline: {
          padding: 12,
          fontSize: basicTheme.typography.pxToRem(14),
        },
        colorSecondary: {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: basicTheme.palette.primary.main,
              borderWidth: 1,
            },
          },
        },
      },
    },
  },
  typography: {
    color: basicTheme.palette.secondary.contrastText,
    h1: {
      fontSize: basicTheme.typography.pxToRem(64),
      fontWeight: basicTheme.typography.fontWeightBold,
    },
    h2: {
      fontSize: basicTheme.typography.pxToRem(48),
      fontWeight: basicTheme.typography.fontWeightBold,
    },
    h3: {
      fontSize: basicTheme.typography.pxToRem(26),
      fontWeight: basicTheme.typography.fontWeightSemiBold,
    },
    h4: {
      fontSize: basicTheme.typography.pxToRem(24),
      fontWeight: basicTheme.typography.fontWeightSemiBold,
    },
    h5: {
      fontSize: basicTheme.typography.pxToRem(18),
      fontWeight: basicTheme.typography.fontWeightSemiBold,
    },
    h6: {
      fontSize: basicTheme.typography.pxToRem(16),
      fontWeight: basicTheme.typography.fontWeightMedium,
    },
    body1: {
      fontSize: basicTheme.typography.pxToRem(14),
      fontWeight: basicTheme.typography.fontWeightMedium,
    },
    body2: {
      fontSize: basicTheme.typography.pxToRem(12),
      fontWeight: basicTheme.typography.fontWeightMedium,
      color: basicTheme.palette.customGrey.MAIN_TEXT,
    },
    subtitle1: {
      fontSize: basicTheme.typography.pxToRem(16),
      fontWeight: basicTheme.typography.fontWeightSemiBold,
    },
    subtitle2: {
      fontSize: basicTheme.typography.pxToRem(14),
      fontWeight: basicTheme.typography.fontWeightSemiBold,
    },
  },
});
