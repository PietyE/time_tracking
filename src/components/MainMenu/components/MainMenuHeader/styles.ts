import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  p: (theme) => theme.spacing(35, 15, 25, 20),
  '& > *:first-child': {
    mb: 50,
  },
};
