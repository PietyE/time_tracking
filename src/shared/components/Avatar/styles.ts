import type { SxProps, Theme } from '@mui/material';
import type { ReverseMap } from 'shared/types';
import type { AvatarSize } from './types';

export const styles: Record<ReverseMap<AvatarSize>, SxProps<Theme>> = {
  extraSmall: {
    width: 35,
    height: 35,
  },
  small: {
    width: 50,
    height: 50,
  },
  medium: {
    width: 80,
    height: 80,
  },
  large: {
    width: 180,
    height: 180,
  },
};
