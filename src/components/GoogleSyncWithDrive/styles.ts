import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  inputContainer: {
    '& .MuiFormControl-root .MuiInputBase-root.Mui-error fieldset': {
      borderColor: 'error.main',
    },
  },
  inputIcon: {
    mr: 10,
  },
};
