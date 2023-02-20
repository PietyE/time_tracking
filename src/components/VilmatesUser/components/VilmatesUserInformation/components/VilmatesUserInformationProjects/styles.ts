import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  overflowY: 'scroll',
  height: 200,
  px: 20,
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
};
