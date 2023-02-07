import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  width: 15,
  height: 1.5,
  borderColor: (theme) => theme.palette.secondary.contrastText,
  ml: 15,
};
