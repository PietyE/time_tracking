import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  height: '100vh',
  bgcolor: 'common.white',
  opacity: 1,
  '& .MuiDrawer-paper': {
    top: 67,
  },
};
