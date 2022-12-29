import { type FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import { useDrawer } from 'hooks/useDrawer';
import BurgerButton from 'shared/components/svg/mainMenu/BurgerButton';
import { createDynamicStyles, styles } from './styles';

export const MainMenuHeaderLogo: FC = (): JSX.Element => {
  const {
    MainMenuLogo,
    handleToggle,
    LogoAndDrawerToggleButtonSeparator,
    isDrawerOpen,
  } = useDrawer();

  return (
    <Grid
      container
      alignItems='flex-start'
      justifyContent={isDrawerOpen ? 'space-between' : 'center'}
      position='relative'
      sx={styles}
    >
      <Grid item>{MainMenuLogo}</Grid>
      {LogoAndDrawerToggleButtonSeparator}
      <Grid item>
        <IconButton
          onClick={handleToggle}
          sx={createDynamicStyles(isDrawerOpen)}
        >
          <BurgerButton />
        </IconButton>
      </Grid>
    </Grid>
  );
};
