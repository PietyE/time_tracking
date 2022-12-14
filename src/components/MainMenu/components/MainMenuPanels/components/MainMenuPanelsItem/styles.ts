import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  mb: 25,
  '&:last-child': {
    mb: 0,
  },
  '& > .MuiTypography-root': {
    ml: 20,
    mb: 10,
  },
};
