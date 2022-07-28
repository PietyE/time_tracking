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
    custom: {},
  },
  typography: {
    fontFamily: 'Montserrat',
  },
})

export const theme = createTheme(basicTheme, {
  overrides: {
    MuiOutlinedInput: {
      root: {
        boxSizing: "border-box",
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
          borderWidth: 1
        },
      },
      input: {
        fontWeight: 600,
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
  },
})
