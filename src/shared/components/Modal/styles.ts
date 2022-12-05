import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiBackdrop-root': {
      bgcolor: (theme) => theme.palette.black[450],
    },
  },
  modalContainer: {
    border: 1,
    borderColor: 'customGrey.STROKE_OPACITY_40',
    borderRadius: 5,
    boxShadow: 1,
    bgcolor: 'common.white',
    '& hr': {
      mb: 24,
    },
  },
  closeButton: {
    position: 'absolute',
    cursor: 'pointer',
    top: 35,
    right: -55,
    '&:hover': {
      background: 'none',
    },
  },
};
