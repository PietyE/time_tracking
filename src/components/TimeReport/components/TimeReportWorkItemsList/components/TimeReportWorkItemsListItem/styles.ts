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
};
