import { type FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useDrawer } from 'hooks/useDrawer';
import {
  getProfileUserNameSelector,
  getProfileUserPositionSelector,
} from 'redux/selectors/profile';
import { useAppSelector } from 'hooks/redux';
import { Avatar } from 'shared/components/Avatar';
import { styles } from './styles';

export const MainMenuUserInfo: FC = (): JSX.Element => {
  // TODO: change avatar prop name to imageUrl when it will be ready in BE
  const userName = useAppSelector(getProfileUserNameSelector);
  const position = useAppSelector(getProfileUserPositionSelector);
  const { isDrawerOpen } = useDrawer();

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
      </Grid>
      {isDrawerOpen && (
        <Grid item>
          <Stack>
            <Typography
              variant='subtitle2'
              color='black.300'
            >
              {position || 'User'}
            </Typography>
            <Typography variant='h6'>{userName}</Typography>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};
