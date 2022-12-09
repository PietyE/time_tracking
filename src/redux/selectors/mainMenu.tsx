import { createSelector } from '@reduxjs/toolkit';
import { getProfilePermissionsSelector } from './profile';
import { createTypedSelector, type CallBackT } from '../utils';
import Clock from 'assets/svg/mainMenu/Clock';
import Coin from 'assets/svg/mainMenu/Coin';
import FileCheck from 'assets/svg/mainMenu/FileCheck';
import People from 'assets/svg/mainMenu/People';
import {
  ButtonsLabels,
  PanelsNames,
} from 'components/MainMenu/components/MainMenuPanels/constants';
import { AppRoutes } from 'constants/appRoutesConstants';
import { PagesViewPermissions } from 'constants/permissions';
import type { Panel } from 'components/MainMenu/components/MainMenuPanels/types';

export const getIsOpenMainMenuDrawer = createTypedSelector<boolean>(
  (state) => state.mainMenu.isOpenDrawer,
);

export const getMainMenuPanels: CallBackT<Panel[]> = createSelector(
  [getProfilePermissionsSelector],
  (permissions) => {
    const tabs: Panel[] = [];
    tabs.push(
      {
        panelName: PanelsNames.MY_WORK,
        buttons: permissions?.includes(
          PagesViewPermissions.users_can_view_vilmates,
        )
          ? [
              {
                icon: <Clock />,
                label: ButtonsLabels.TIME_REPORT,
                pathname: AppRoutes.timeReport,
              },
              {
                icon: <People />,
                label: ButtonsLabels.VILMATES,
                pathname: AppRoutes.vilmates,
              },
            ]
          : [
              {
                icon: <Clock />,
                label: ButtonsLabels.TIME_REPORT,
                pathname: AppRoutes.timeReport,
              },
            ],
      },
      {
        panelName: PanelsNames.ACCOUNTING,
        buttons: [
          {
            icon: <Coin />,
            label: ButtonsLabels.PROJECT_REPORT,
            pathname: AppRoutes.projectReport,
          },
        ],
      },
    );
    if (
      permissions?.includes(
        PagesViewPermissions.users_can_view_projectmanagement,
      )
    )
      tabs.push({
        panelName: PanelsNames.MANAGEMENT,
        buttons: [
          {
            icon: <FileCheck />,
            label: ButtonsLabels.PROJECT_MANAGEMENT,
            pathname: AppRoutes.projectManagement,
          },
        ],
      });
    return tabs;
  },
);
