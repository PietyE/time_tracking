import { type FC, type ReactElement, type MouseEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ButtonsLabels } from 'components/MainMenu/components/MainMenuPanels/constants';
import { styles } from './styles';

export interface NavButtonProps {
  icon: ReactElement;
  label: ButtonsLabels;
  smallSize: boolean;
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
}

export const NavButton: FC<NavButtonProps> = (button) => {
  const { smallSize, icon, label, onClick } = button;
  return (
    <Box
      sx={styles.buttonContainer}
      position='relative'
      onClick={onClick}
    >
      <Grid
        container
        alignItems='center'
        sx={styles.buttonContentContainer}
      >
        <Grid item>{icon}</Grid>
        {smallSize && (
          <Grid item>
            <Typography>{label}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
