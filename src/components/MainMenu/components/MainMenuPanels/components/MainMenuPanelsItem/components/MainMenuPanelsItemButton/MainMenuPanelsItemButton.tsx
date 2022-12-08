import { type FC } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import type { classNameWithIsActiveNavLink } from 'shared/types';
import type { PanelButton } from 'components/MainMenu/components/MainMenuPanels/types';
import { styles } from './styles';

interface Props {
  button: PanelButton;
}

export const MainMenuPanelsItemButton: FC<Props> = ({
  button,
}): JSX.Element => {
  const className: classNameWithIsActiveNavLink = ({ isActive }) =>
    isActive ? 'main_menu_link active' : 'main_menu_link';

  return (
    <NavLink
      to={button.pathname}
      className={className}
    >
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
    </NavLink>
  );
};
