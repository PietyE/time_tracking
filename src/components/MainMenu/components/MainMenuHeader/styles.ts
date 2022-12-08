import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    p: (theme) => theme.spacing(35, 15, 25, 20),
  },
  logoContainer: {
    '& .MuiGrid-root.MuiGrid-item': {
      cursor: 'pointer',
      '&:last-child': {
        pt: 12,
      },
    },
  },
};
