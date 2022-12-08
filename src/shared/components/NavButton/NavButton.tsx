import { type FC, type ReactElement } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ButtonsLabels } from 'components/MainMenu/components/MainMenuPanels/constants';
import { styles } from './styles';

export interface NavButtonProps {
  icon: ReactElement;
  label: ButtonsLabels;
  smallSize?: boolean;
}

export const NavButton: FC<NavButtonProps> = (button) => (
  <Box
    sx={styles.buttonContainer}
    position='relative'
  >
    <Grid
      container
      alignItems='center'
      sx={styles.buttonContentContainer}
    >
      <Grid item>{button.icon}</Grid>
      <Grid item>
        <Typography>{button.label}</Typography>
      </Grid>
    </Grid>
  </Box>
);
