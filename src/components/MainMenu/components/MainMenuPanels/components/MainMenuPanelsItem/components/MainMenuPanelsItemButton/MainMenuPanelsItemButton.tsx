import { type FC } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import type { PanelButton } from 'components/MainMenu/components/MainMenuPanels/types';
import { styles } from './styles';

interface Props {
  button: PanelButton;
}

export const MainMenuPanelsItemButton: FC<Props> = ({
  button,
}): JSX.Element => (
  <Box sx={styles.buttonContainer}>
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
