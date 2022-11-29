import type { FC, PropsWithChildren } from 'react';
import { Box, type BoxProps } from '@mui/material';
import type { SizingContainerProps } from './types';
import { styles } from './styles';

type Props = BoxProps & SizingContainerProps & { maxWidth?: never };

export const SizingContainer: FC<PropsWithChildren<Props>> = ({
  size,
  children,
  ...props
}): JSX.Element => (
  <Box
    sx={{ ...styles[size] }}
    {...props}
  >
    {children}
  </Box>
);
