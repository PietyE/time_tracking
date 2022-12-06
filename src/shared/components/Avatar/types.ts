import type { ReactNode } from 'react';
import type { ReverseMap } from 'shared/types';
import type { SxProps, Theme } from '@mui/material';

export interface AvatarSize {
  size: 'extraSmall' | 'small' | 'medium' | 'large';
}

export type AvatarProps = AvatarSize & { alt?: never; sx?: never };

export type AvatarCreateTypes = (
  name: string,
  size: ReverseMap<AvatarSize>,
) => {
  sx: SxProps<Theme>;
  children: ReactNode;
};
