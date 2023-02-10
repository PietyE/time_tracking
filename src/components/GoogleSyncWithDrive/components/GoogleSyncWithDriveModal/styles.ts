import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  modalContainer: {
    transform: 'translate(-50%, -50%)',
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: -45,
    cursor: 'pointer',
  },
  modalContentContainer: {
    '&::-webkit-scrollbar': {
      width: 6,
      borderRadius: 2.5,
    },

    '&::-webkit-scrollbar-track': {
      background: (theme) => theme.palette.customGrey.STROKE_OPACITY_40,
      borderRadius: 2.5,
      webkitBoxShadow: 'inset 0 2px 2px $scrollBoxShadow',
    },

    '&::-webkit-scrollbar-thumb': {
      boxShadow: 1,
      bgcolor: (theme) => theme.palette.customGrey.STROKE_OPACITY_40,
      borderRadius: 2.5,
    },
  },
  buttonGroup: {
    height: 64,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    '& .MuiButton-root': {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      '&:last-child': {
        borderBottomRightRadius: 20,
        fontWeight: (theme) => theme.typography.fontWeightSemiBold,
      },
      '&:first-child': {
        borderBottomLeftRadius: 20,
        fontWeight: (theme) => theme.typography.fontWeightSemiBold,
      },
    },
  },
  usersGoogleSheetList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: 434 / 2,
    '&:after': {
      position: 'absolute',
      top: 16,
      left: -40,
      width: 1,
      height: '100%',
      background: 'customGrey.STROKE_OPACITY_40',
      content: `''`,
    },
  },
};
