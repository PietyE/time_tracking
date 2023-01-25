import type { SxProps, Theme } from '@mui/material';

export const createStyles = (
  reportValueInputError: boolean,
): Record<string, SxProps<Theme>> => ({
  button: {
    '&: hover': {
      bgcolor: reportValueInputError ? 'primary.light' : 'primary.dark',
    },
    borderRadius: 1.5,
    bgcolor: reportValueInputError ? 'primary.light' : 'primary.main',
    p: 12,
    '& svg': { color: 'common.white' },
  },
  container: {
    p: (theme) => theme.spacing(16, 30, reportValueInputError ? 50 : 16, 6),
    '& .MuiGrid-item .MuiInputBase-root.Mui-error fieldset': {
      borderColor: 'error.main',
    },
  },
  wrapper: {
    m: (theme) => theme.spacing(0, 0, 16),
    '&:last-child': {
      m: 0,
    },
  },
});
