import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    py: 0,
  },
  '& button': {
    transition: 'all 0.3s ease-out',
  },
};
