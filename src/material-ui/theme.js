import { createTheme } from '@material-ui/core'
import { COLORS } from './constants'

const basicTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.mainGreen,
      light: COLORS.lightGreen,
      contrastText: COLORS.white,
    },
    secondary: {
      main: COLORS.mainGray,
      light: COLORS.lightGray,
      dark: COLORS.darkGray,
      contrastText: COLORS.mainBlack,
    },
    text: {
      disabled: COLORS.textDisabled,
    },
    custom: {
      mainGray: COLORS.mainGray,
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1200,
      desktop: 1680,
    },
  },
})

export const theme = createTheme(basicTheme, {
  overrides: {
    MuiAutocomplete: {
      root: {
        userSelect: 'none',
        "& .MuiIconButton-root": {
          borderRadius: 0,
          "&:hover": {
            backgroundColor: 'transparent'
          }
        }
      },
      inputRoot: {
        '&&&&&': {
          paddingTop: 8,
          paddingRight: 34,
          paddingBottom: 8,
          paddingLeft: 16,
        },
        "& .MuiInputAdornment-positionStart": {
          color: basicTheme.palette.custom.mainGray
        }
      },
      input: {
        '&&&': {
          padding: '0 10px 0 0',
        },
      },
      popupIndicator: {
        color: basicTheme.palette.common.black
      },
      clearIndicator: {
        padding: 0
      },
      
    },
    MuiOutlinedInput: {
      root: {
        boxSizing: 'border-box',
        padding: 12,
        minHeight: 42,
        background: basicTheme.palette.common.white,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${basicTheme.palette.secondary.main}`,
          borderColor: basicTheme.palette.secondary.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderStyle: 'solid',
          borderColor: basicTheme.palette.primary.main,
          borderWidth: 1,
        },
      },
      input: {
        fontWeight: 500,
        fontSize: 14,
        padding: 0,
        '&::placeholder': {
          color: 'basicTheme.palette.text.disabled',
        },
      },
      multiline: {
        padding: 12,
        fontSize: 14,
      },
      notchedOutline: {
        border: `1px solid ${basicTheme.palette.secondary.main}`,
        borderColor: basicTheme.palette.secondary.main,
      },
      colorSecondary: {
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderStyle: 'solid',
            borderColor: basicTheme.palette.primary.main,
            borderWidth: 1,
          },
        },
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none',
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
})
