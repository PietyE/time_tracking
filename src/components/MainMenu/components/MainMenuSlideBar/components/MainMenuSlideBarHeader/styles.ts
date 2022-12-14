import type { SxProps, Theme } from '@mui/material';

export const createDynamicStyles = (isDrawerOpen: boolean): SxProps<Theme> => ({
  p: (theme) =>
    isDrawerOpen ? theme.spacing(35, 15, 25, 20) : theme.spacing(35, 17),
  '& > *:first-of-type': {
    mb: 30,
  },
});
