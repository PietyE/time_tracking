import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  '& .MuiGrid-root.MuiGrid-item': {
    '&:first-of-type': {
      mr: 15,
    },
  },
  p: (theme) => ({
    xs: theme.spacing(35, 20),
    sm: 0,
  }),
};
