import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  button: {
    '&: hover': {
      bgcolor: 'primary.dark',
    },
    borderRadius: 1.5,
    bgcolor: 'primary.main',
    p: 12,
    '& svg': { color: 'common.white' },
  },
  container: {
    p: (theme) => theme.spacing(16, 30, 16, 6),
    m: (theme) => theme.spacing(0, 0, 16),
    '&:last-child': {
      m: 0,
    },
  },
};
