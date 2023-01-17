import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  mainContainer: {
    '& > .MuiGrid-item': {
      width: '100%',
    },
  },
  header: {
    px: 28,
    mb: 12,
    '& .MuiTypography-root': {
      textTransform: 'uppercase',
      mr: 5,
      cursor: 'pointer',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: (theme) => theme.palette.primary.main,
      },
    },
    '& div[class*=MuiStack-root] svg:last-child': {
      transform: 'rotate(180deg)',
    },
  },
  itemContainer: {
    p: (theme) => theme.spacing(25, 30),
    mb: 15,
    '&:last-child': {
      mb: 0,
    },
  },
};
