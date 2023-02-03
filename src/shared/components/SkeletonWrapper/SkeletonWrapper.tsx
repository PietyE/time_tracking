import { type FC, type PropsWithChildren } from 'react';
import { Skeleton, type SkeletonProps } from '@mui/material';

interface Props extends SkeletonProps {
  isLoading: boolean;
}

export const SkeletonWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  ...props
}): JSX.Element => (isLoading ? <Skeleton {...props} /> : <>{children}</>);
