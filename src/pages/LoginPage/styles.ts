import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    p: 16,
    pt: '10vh',
    m: '0 auto',
    '& > svg': {
      mb: '7vh',
    },
  },
};
