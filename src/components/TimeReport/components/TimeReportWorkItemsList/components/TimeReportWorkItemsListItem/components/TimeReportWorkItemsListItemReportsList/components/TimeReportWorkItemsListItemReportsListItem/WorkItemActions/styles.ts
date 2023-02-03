import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  dialogContainer: {
    '& .MuiPaper-root': {
      py: 20,
      px: 100,
      borderRadius: 5,
    },
    '& .MuiBackdrop-root': {
      backdropFilter: 'blur(5px)',
    },
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  swapDialogSelectedProject: { py: 0, '& .MuiInputBase-root': { py: 10 } },
};
