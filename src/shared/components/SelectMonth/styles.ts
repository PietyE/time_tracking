import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  leftButton: {
    borderRadius: 0,
    borderRight: 1,
    borderColor: 'text.disabled',
  },
  rightButton: {
    borderRadius: 0,
    borderLeft: 1,
    borderColor: 'text.disabled',
    '& > svg': {
      transform: 'rotate(-180deg)',
    },
  },
  yearContainer: {
    cursor: 'pointer',
    userSelect: 'none',
    '& > svg': {
      mr: 10,
      fontSize: (theme) => theme.typography.pxToRem(20),
    },
  },
};
