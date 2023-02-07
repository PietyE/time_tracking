import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  fontWeight: (theme) => theme.typography.fontWeightSemiBold,
  bgcolor: (theme) => theme.palette.common.white,
  minWidth: 180,
};
