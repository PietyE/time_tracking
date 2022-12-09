import { type FC } from 'react';
import { MainMenuBurgerMenu } from './components/MainMenuBurgerMenu';
import { MainMenuSlideBar } from './components/MainMenuSlideBar';

const MainMenu: FC = () => {
  return (
    <>
      <MainMenuSlideBar />
      <MainMenuBurgerMenu />
    </>
  );
};

export default MainMenu;
