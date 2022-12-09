import { type FC } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import BurgerButton from 'assets/svg/mainMenu/BurgerButton';
import VilmateIcon from 'assets/svg/VilmateIcon';
import { styles } from './styles';

interface Props {
  toggleDrawer: any;
}

export const MainMenuBurgerMenuAppBar: FC<Props> = ({
  toggleDrawer,
}): JSX.Element => (
  <AppBar
    position='fixed'
    color='inherit'
    sx={styles.appBar}
  >
    <Toolbar sx={styles.toolbar}>
      <IconButton onClick={toggleDrawer}>
        <BurgerButton />
      </IconButton>
      <Typography
        variant='h5'
        flex='1 1 auto'
      >
        Vilmates
      </Typography>
      <VilmateIcon />
    </Toolbar>
  </AppBar>
);
