import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  '& .MuiGrid-root.MuiGrid-item': {
    '&:first-of-type': {
      mr: 15,
    },
  },
};
