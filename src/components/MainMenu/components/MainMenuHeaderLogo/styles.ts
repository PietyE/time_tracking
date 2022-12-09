import type { SxProps, Theme } from '@mui/material';
import { ToggleButtonPadding } from 'hooks/useDrawer/contants';

export const styles: SxProps<Theme> = {
  '& .MuiGrid-root.MuiGrid-item': {
    '&:last-child': {
      pt: 12,
      cursor: 'pointer',
    },
  },
};

export const createDynamicStyles = (isDrawerOpen: boolean): SxProps<Theme> => ({
  pt: isDrawerOpen ? ToggleButtonPadding.DESKTOP : ToggleButtonPadding.LAPTOP,
  '&:hover': {
    background: 'none',
  },
});
