import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  toolbar: {
    p: (theme) => theme.spacing(17, 12),
    '& > button:first-of-type': {
      mr: 25,
      cursor: 'pointer',
    },
  },
  appBar: {
    zIndex: 'tooltip',
  },
};
