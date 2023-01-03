import { type FC, type MouseEvent } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import BurgerButton from 'shared/components/svg/mainMenu/BurgerButton';
import VilmateIcon from 'shared/components/svg/VilmateIcon';
import { styles } from './styles';

interface Props {
  toggleDrawer: (
    event?: MouseEvent<HTMLButtonElement>,
    reason?: 'backdropClick' | 'escapeKeyDown',
  ) => void;
}

export const MainMenuBurgerMenuAppBar: FC<Props> = ({
  toggleDrawer,
}): JSX.Element => (
  <AppBar
    position='fixed'
    color='inherit'
  >
    <Toolbar sx={styles}>
      <IconButton
        onClick={toggleDrawer}
        aria-label='menu'
      >
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
