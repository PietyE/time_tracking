import { type FC, type ReactElement, type MouseEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDrawer } from '../../../hooks/useDrawer';
import { ButtonsLabels } from 'components/MainMenu/components/MainMenuPanels/constants';
import { createDynamicStyles } from './styles';

export interface NavButtonProps {
  icon: ReactElement;
  label: ButtonsLabels;
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
}

export const NavButton: FC<NavButtonProps> = (button) => {
  const { isDrawerOpen } = useDrawer();
  const { icon, label, onClick } = button;

  const styles = createDynamicStyles(isDrawerOpen);

  return (
    <Box
      sx={styles.buttonContainer}
      position='relative'
      onClick={onClick}
    >
      <Grid
        container
        alignItems='center'
        justifyContent={isDrawerOpen ? 'start' : 'center'}
        sx={styles.buttonContentContainer}
      >
        <Grid item>{icon}</Grid>
        {isDrawerOpen && (
          <Grid item>
            <Typography>{label}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
