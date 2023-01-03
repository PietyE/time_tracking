import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  p: (theme) => ({
    xs: theme.spacing(25, 16),
    sm: theme.spacing(45, 60),
  }),
  '& .MuiDivider-root': {
    my: 15,
    '&::before, &::after': {
      top: 0,
    },
    '& .MuiDivider-wrapper': {
      px: 20,
      color: (theme) => theme.palette.text.disabled,
    },
  },
};
