import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  '& .MuiTextField-root': {
    mb: 30,
    '& .MuiInputBase-root': {
      py: 16,
    },
  },
  '& .MuiButtonBase-root': {
    py: 15,
    textTransform: 'uppercase',
    fontSize: (theme) => theme.typography.pxToRem(18),
    fontWeight: (theme) => theme.typography.fontWeightSemiBold,
  },
};
