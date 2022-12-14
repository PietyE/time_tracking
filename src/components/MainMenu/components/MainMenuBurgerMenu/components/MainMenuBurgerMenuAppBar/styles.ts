import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  p: (theme) => theme.spacing(17, 12),
  '& > button:first-of-type': {
    mr: 25,
    cursor: 'pointer',
  },
};
