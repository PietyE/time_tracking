import { type FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import {
  getProfileUserNameSelector,
  getProfileUserPositionSelector,
} from '../../../../../../redux/selectors/profile';
import { useAppShallowSelector } from 'hooks/redux';
import { Avatar } from 'shared/components/Avatar';
import { styles } from './styles';

export const MainMenuHeaderUserInfo: FC = (): JSX.Element => {
  // TODO: change avatar with imageUrl when it will be ready in BE
  const userName = useAppShallowSelector(getProfileUserNameSelector);
  const position = useAppShallowSelector(getProfileUserPositionSelector);
  return (
    <Grid
      container
      alignItems='flex-start'
      justifyContent='flex-start'
      sx={styles}
    >
      <Grid item>
        <Avatar
          size='small'
          name={userName}
        />
        {position}
      </Grid>
      <Grid item>
        <Stack>
          <Typography
            variant='subtitle2'
            color='black.300'
          >
            {position || 'position'}
          </Typography>
          <Typography variant='h6'>{userName}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
