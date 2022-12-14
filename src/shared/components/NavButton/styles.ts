import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  buttonContainer: (theme) => ({
    cursor: 'pointer',
    '&:hover': {
      bgcolor: 'background.lightGreen',
      '& .MuiGrid-container .MuiGrid-item': {
        color: 'primary.main',
      },
      '& .MuiGrid-container .MuiGrid-item svg': {
        '& g path': {
          fill: theme.palette.primary.main,
        },
        '& path': {
          fill: theme.palette.primary.main,
        },
      },
      '&::after': {
        backgroundColor: theme.palette.primary.dark,
        bottom: 0,
        content: `''`,
        position: 'absolute',
        right: 0,
        top: 0,
        width: 4,
      },
    },
  }),
  buttonContentContainer: {
    p: (theme) => theme.spacing(10, 20),
    '& .MuiGrid-item svg': {
      mr: 14,
    },
  },
};
