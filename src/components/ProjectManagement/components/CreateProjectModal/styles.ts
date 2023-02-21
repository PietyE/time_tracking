import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  modalContainer: {
    transform: 'translate(-50%, -50%)',
  },
  closeIcon: {
    '& svg': {
      fill: (theme) => theme.palette.primary.contrastText,
    },
  },
};
