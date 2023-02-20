import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  listItem: {
    display: 'flex',
    flexDirection: 'column',

    p: 16,
    mb: 16,
    border: 1,
    borderRadius: 1.5,
    borderColor: (theme) => theme.palette.customGrey.STROKE_OPACITY_40,

    '&:last-child': {
      mb: 0,
    },
  },
  container: {
    '& p': {
      '&:first-child': {
        maxWidth: 150,
        lineBreak: 'anywhere',
      },
    },

    '&:last-child': {
      pb: 0,
    },
  },
  title: {
    wordBreak: 'break-all',
  },
  projectsContainer: {
    '& p': {
      '&:first-child': {
        maxWidth: 150,
        lineBreak: 'anywhere',
      },
    },

    '&:last-child': {
      pb: 0,
    },
  },
};
