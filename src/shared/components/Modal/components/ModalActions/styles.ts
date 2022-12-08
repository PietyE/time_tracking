import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  singleButton: {
    '&.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-fullWidth button':
      {
        borderRadius: '0px 0px 20px 20px',
        py: 20,
        fontWeight: (theme) => theme.typography.fontWeightSemiBold,
        fontSize: (theme) => theme.typography.pxToRem(18),
      },
  },
  twoButtons: {
    '&.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-fullWidth button':
      {
        py: 20,
        fontWeight: (theme) => theme.typography.fontWeightSemiBold,
        fontSize: (theme) => theme.typography.pxToRem(18),
        borderColor: 'common.white',
        '&::first-of-type': {
          borderRadius: '0px 0px 0px 20px',
        },
        '&:last-child': {
          borderRadius: '0px 0px 20px 0px',
        },
      },
  },
};
