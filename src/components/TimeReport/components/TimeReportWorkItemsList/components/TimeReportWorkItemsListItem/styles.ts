import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  m: (theme) => theme.spacing(0, 0, 16),
  '&:last-child': {
    m: 0,
  },
};
