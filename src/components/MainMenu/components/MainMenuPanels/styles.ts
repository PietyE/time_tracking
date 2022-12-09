import type { SxProps, Theme } from '@mui/material';

export const createDynamicStyles = (isDrawerOpen: boolean): SxProps<Theme> => ({
  py: 25,
  pb: isDrawerOpen ? 25 : 85,
});
