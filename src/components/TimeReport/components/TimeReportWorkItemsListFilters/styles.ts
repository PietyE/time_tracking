import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  '& .MuiGrid-item': {
    mr: 20,
    '&:last-child': {
      mr: 0,
      justifySelf: 'flex-end',
      ml: 90,
    },
  },
};
