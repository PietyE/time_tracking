import type { SxProps, Theme } from '@mui/material';
import type { SizingContainerProps } from './types';

export const styles: Record<
  ReverseMap<SizingContainerProps>,
  SxProps<Theme>
> = {
  extraSmall: {
    maxWidth: 210,
  },
  small: {
    maxWidth: 365,
  },
  medium: {
    maxWidth: 575,
  },
  large: {
    maxWidth: 715,
  },
};
