import type { SxProps, Theme } from '@mui/material';

export const createDynamicStyles = (isDrawerOpen: boolean): SxProps<Theme> => ({
  mb: isDrawerOpen ? 25 : 0,
  '&:last-child': {
    mb: 0,
  },
  '& > .MuiTypography-root': {
    ml: 20,
    mb: 10,
  },
});
