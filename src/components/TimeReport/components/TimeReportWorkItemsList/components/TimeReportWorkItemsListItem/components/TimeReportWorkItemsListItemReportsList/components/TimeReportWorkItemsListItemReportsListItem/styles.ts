import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  link: {
    '& a': {
      color: 'text.link',
    },
  },
  popup: {
    '& > button': {
      justifyContent: 'flex-start',
    },
  },
};
