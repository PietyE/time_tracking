import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  '& .MuiGrid-root.MuiGrid-item': {
    '&:last-child': {
      pt: 12,
      cursor: 'pointer',
    },
  },
};
