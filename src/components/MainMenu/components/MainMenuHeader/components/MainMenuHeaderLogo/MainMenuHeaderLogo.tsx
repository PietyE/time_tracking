import { type FC } from 'react';
import { Grid } from '@mui/material';
import BurgerButton from 'shared/svg/BurgerButton';
import Logo from 'shared/svg/Logo';
import { styles } from './styles';

export const MainMenuHeaderLogo: FC = (): JSX.Element => (
  <Grid
    container
    alignItems='flex-start'
    justifyContent='space-between'
    sx={styles}
  >
    <Grid item>
      <Logo />
    </Grid>
    <Grid item>
      <BurgerButton />
    </Grid>
  </Grid>
);
