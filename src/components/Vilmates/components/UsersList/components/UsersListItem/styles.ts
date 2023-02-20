import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: 220,
  p: 24,
  boxShadow: 1,
  borderRadius: 2.5,
  cursor: 'pointer',
  '&:hover': {
    border: 1,
    borderColor: (theme) => theme.palette.primary.main,
  },
};
