import { type FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import { useDrawer } from 'hooks/useDrawer';
import BurgerButton from 'assets/svg/mainMenu/BurgerButton';
import { styles } from './styles';

export const MainMenuHeaderLogo: FC = (): JSX.Element => {
  const {
    MainMenuLogo,
    handleToggle,
    LogoAndDrawerToggleButtonSeparator,
    toggleButtonStyles,
  } = useDrawer();

  return (
    <Grid
      container
      alignItems='flex-start'
      justifyContent='space-between'
      position='relative'
      sx={styles}
    >
      <Grid item>{MainMenuLogo}</Grid>
      {LogoAndDrawerToggleButtonSeparator}
      <Grid item>
        <IconButton
          onClick={handleToggle}
          sx={toggleButtonStyles}
        >
          <BurgerButton />
        </IconButton>
      </Grid>
    </Grid>
  );
};
