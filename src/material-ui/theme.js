import { createTheme } from '@material-ui/core'
import * as CONSTANTS from './constants'

export const theme = createTheme({
  palette: {
    primary: {
      main: CONSTANTS.mainGreenColor,
      light: CONSTANTS.lightGreenColor,
      contrastText: CONSTANTS.whiteColor,
    },
    secondary: {
      main: CONSTANTS.mainGrayColor,
      light: CONSTANTS.lightGrayColor,
      dark: CONSTANTS.darkGrayColor,
      contrastText: CONSTANTS.mainBlackColor,
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
})
