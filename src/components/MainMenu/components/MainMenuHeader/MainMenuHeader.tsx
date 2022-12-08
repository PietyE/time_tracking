import { type FC } from 'react';
import { Box, Grid } from '@mui/material';
import Logo from 'shared/svg/Logo';
import BurgerButton from 'shared/svg/BurgerButton';
import { styles } from './styles';

export const MainMenuHeader: FC = (): JSX.Element => (
  <Box sx={styles.container}>
    <Grid
      container
      alignItems='flex-start'
      justifyContent='space-between'
      sx={styles.logoContainer}
    >
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>
        <BurgerButton />
      </Grid>
    </Grid>
  </Box>
);
