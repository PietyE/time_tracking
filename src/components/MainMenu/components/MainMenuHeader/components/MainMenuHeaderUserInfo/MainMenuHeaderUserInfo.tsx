import { type FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { getIsOpenMainMenuDrawer } from '../../../../../../redux/selectors/mainMenu';
import {
  getProfileUserNameSelector,
  getProfileUserPositionSelector,
} from 'redux/selectors/profile';
import { useAppShallowSelector } from 'hooks/redux';
import { Avatar } from 'shared/components/Avatar';
import { styles } from './styles';

export const MainMenuHeaderUserInfo: FC = (): JSX.Element => {
  // TODO: change avatar prop name to imageUrl when it will be ready in BE
  const userName = useAppShallowSelector(getProfileUserNameSelector);
  const position = useAppShallowSelector(getProfileUserPositionSelector);
  const isOpenDrawer = useAppShallowSelector(getIsOpenMainMenuDrawer);

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
      {isOpenDrawer && (
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
