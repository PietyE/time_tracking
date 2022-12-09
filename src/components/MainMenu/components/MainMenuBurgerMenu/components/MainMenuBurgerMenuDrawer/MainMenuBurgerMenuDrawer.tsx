import { type FC, type MouseEvent } from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import { MainMenuPanels } from 'components/MainMenu/components/MainMenuPanels';
import { MainMenuUserInfo } from 'components/MainMenu/components/MainMenuUserInfo';
import { MainMenuFooter } from 'components/MainMenu/components/MainMenuFooter';
import { styles } from './styles';

interface Props {
  isOpen: boolean;
  onCloseDrawer: (
    event: MouseEvent<HTMLElement>,
    reason?: 'backdropClick' | 'escapeKeyDown',
  ) => void;
  reason?: 'backdropClick' | 'escapeKeyDown';
}

export const MainMenuBurgerMenuDrawer: FC<Props> = ({
  isOpen,
  onCloseDrawer,
}): JSX.Element => (
  <Drawer
    anchor='top'
    ModalProps={{ disablePortal: true }}
    open={isOpen}
    onClose={onCloseDrawer}
    transitionDuration={300}
    sx={styles}
  >
    <Box onClick={onCloseDrawer}>
      <MainMenuUserInfo />
      <Divider />
      <MainMenuPanels />
      <Divider />
      <MainMenuFooter />
    </Box>
  </Drawer>
);
