import { type FC, useState } from 'react';
import { Box } from '@mui/material';
import { MainMenuBurgerMenuAppBar } from './components/MainMenuBurgerMenuAppBar';
import { MainMenuBurgerMenuDrawer } from './components/MainMenuBurgerMenuDrawer';
import { styles } from './styles';

export const MainMenuBurgerMenu: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // @ts-expect-error
  const onCloseDrawer = (event?): void => setIsOpen(false);

  const toggleDrawer = (): void =>
    setIsOpen((prevIsOpenDrawer) => !prevIsOpenDrawer);

  return (
    <Box sx={styles}>
      <MainMenuBurgerMenuAppBar toggleDrawer={toggleDrawer} />
      <MainMenuBurgerMenuDrawer
        isOpen={isOpen}
        onCloseDrawer={onCloseDrawer}
      />
    </Box>
  );
};
