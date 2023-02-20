import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  addDeveloperToProjectFormInput: {
    '& .MuiInputBase-root': {
      py: 0,
      '& input': {
        cursor: 'pointer',
      },
    },
  },
};
