import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  m: 0,
  color: (theme) => theme.palette.secondary.contrastText,

  '& .MuiTypography-body1': {
    fontSize: (theme) => theme.typography.pxToRem(14),
  },
};
