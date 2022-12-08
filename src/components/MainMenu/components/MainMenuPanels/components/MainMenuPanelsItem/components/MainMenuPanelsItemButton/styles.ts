import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  buttonContainer: {
    cursor: 'pointer',
    '&:hover': {
      bgcolor: 'background.lightGreen',
    },
  },
  buttonContentContainer: {
    p: (theme) => theme.spacing(10, 20),
    '& .MuiGrid-item svg': {
      mr: 14,
    },
  },
};
