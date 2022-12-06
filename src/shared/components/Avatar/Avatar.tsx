import { type FC } from 'react';
import {
  Avatar as MUIAvatar,
  type AvatarProps as MUIAvatarProps,
} from '@mui/material';
import { stringAvatar } from './helpers';
import type { AvatarProps } from './types';

type AvatarWithImageUrl = AvatarProps &
  MUIAvatarProps & { src: string; name?: never };
type AvatarByName = AvatarProps &
  MUIAvatarProps & { name: string; src?: never };

type Props = AvatarWithImageUrl | AvatarByName;

export const Avatar: FC<Props> = ({
  size = 'large',
  name = '4 0 4',
  src = '',
  ...props
}): JSX.Element => (
  <MUIAvatar
    src={src}
    {...stringAvatar(name, size)}
    {...props}
  />
);
