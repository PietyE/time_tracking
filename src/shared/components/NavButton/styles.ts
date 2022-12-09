import type { SxProps, Theme } from '@mui/material';

export const createDynamicStyles = (
  smallSize: boolean,
): Record<string, SxProps<Theme>> => ({
  buttonContentContainer: {
    p: (theme) => theme.spacing(10, 20),
    '& .MuiGrid-item svg': {
      mr: smallSize ? 14 : 0,
    },
  },
  buttonContainer: (theme) => ({
    cursor: 'pointer',
    mb: smallSize ? 0 : 6,
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
});
