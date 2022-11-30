import { styles } from '../styles';
import { GreyColors } from 'constants/colors';
import type { AvatarCreateTypes } from '../types';

export const stringToColor = (string: string): string => {
  if (!string) return GreyColors.STROKE_FORM_OPACITY_20;
  let hash: number = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const getName = (name: string): string => {
  if (!name) return 'A';
  const fullName = name.split(' ');
  switch (fullName?.length) {
    case 1:
      return `${fullName[0][0]}`;
    case 2:
      return `${fullName[0][0]}${fullName[1][0]}`;
    case 3:
      return `${fullName[0][0]}${fullName[1][0]}${fullName[2][0]}`;
    default:
      return 'A';
  }
};

export const stringAvatar: AvatarCreateTypes = (name, size) => ({
  sx: {
    bgcolor: stringToColor(name),
    ...styles[size],
  },
  children: getName(name),
});
