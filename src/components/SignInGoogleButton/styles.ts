import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  position: 'relative',
  '&.MuiButton-text': {
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.03rem',
    color: 'secondary.contrastText',
    textTransform: 'initial',
  },
  '&.MuiButton-root': {
    background: (theme) => theme.palette.common.white,
    border: 1,
    borderColor: 'customGrey.STROKE_FORM_OPACITY_20',
    borderRadius: 1,
    height: 56,
    padding: (theme) => theme.spacing(0, 16),
    justifyContent: 'flex-start',
  },
  '&:hover': {
    bgcolor: 'background.grey',
  },
};
