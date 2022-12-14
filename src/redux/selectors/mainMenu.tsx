import { createSelector } from '@reduxjs/toolkit';
import { getProfilePermissionsSelector } from './profile';
import Clock from 'assets/svg/mainMenu/Clock';
import Coin from 'assets/svg/mainMenu/Coin';
import FileCheck from 'assets/svg/mainMenu/FileCheck';
import Vilmates from 'assets/svg/mainMenu/Vilmates';
import {
  ButtonsLabels,
  PanelsNames,
} from 'components/MainMenu/components/MainMenuPanels/constants';
import { AppRoutes } from 'constants/appRoutesConstants';
import { PagesViewPermissions } from 'constants/permissions';
import type { CallBackT } from '../utils';
import type { Panel } from 'components/MainMenu/components/MainMenuPanels/types';

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
                smallSize: true,
                pathname: AppRoutes.timeReport,
              },
              {
                icon: <Vilmates />,
                label: ButtonsLabels.VILMATES,
                smallSize: true,
                pathname: AppRoutes.vilmates,
              },
            ]
          : [
              {
                icon: <Clock />,
                label: ButtonsLabels.TIME_REPORT,
                smallSize: true,
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
            smallSize: true,
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
            smallSize: true,
            pathname: AppRoutes.projectManagement,
          },
        ],
      });
    return tabs;
  },
);
