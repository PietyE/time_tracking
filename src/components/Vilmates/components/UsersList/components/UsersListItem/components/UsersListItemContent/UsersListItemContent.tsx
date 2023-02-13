import { type FC } from 'react';
import { Typography, CardContent } from '@mui/material';
import { styles } from './styles';

interface Props {
  name: string;
  email: string;
}

export const UsersListItemContent: FC<Props> = ({
  name,
  email,
}): JSX.Element => (
  <CardContent sx={styles}>
    <Typography
      variant='subtitle2'
      component='p'
      textAlign='center'
      maxWidth={90}
      m='0 auto'
      mb={10}
    >
      {name}
    </Typography>
    <Typography
      component='p'
      variant='body2'
      maxWidth={175}
      noWrap
    >
      {email}
    </Typography>
  </CardContent>
);
