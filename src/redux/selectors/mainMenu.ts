import { createSelector } from '@reduxjs/toolkit';
import { getProfilePermissionsSelector } from './profile';
import { createTypedSelector, type CallBack } from '../utils';
import {
  ButtonNames,
  ButtonsLabels,
  PanelsNames,
} from 'components/MainMenu/components/MainMenuPanels/constants';
import { AppRoutes } from 'constants/appRoutesConstants';
import { PagesViewPermissions } from 'constants/permissions';
import type { Panel } from 'components/MainMenu/components/MainMenuPanels/types';

export const getIsOpenMainMenuDrawer = createTypedSelector<boolean>(
  (state) => state.mainMenu.isOpenDrawer,
);

export const getMainMenuPanels: CallBack<Panel[]> = createSelector(
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
                icon: ButtonNames.CLOCK,
                label: ButtonsLabels.TIME_REPORT,
                pathname: AppRoutes.timeReport,
              },
              {
                icon: ButtonNames.PEOPLE,
                label: ButtonsLabels.VILMATES,
                pathname: AppRoutes.vilmates,
              },
            ]
          : [
              {
                icon: ButtonNames.CLOCK,
                label: ButtonsLabels.TIME_REPORT,
                pathname: AppRoutes.timeReport,
              },
            ],
      },
      {
        panelName: PanelsNames.ACCOUNTING,
        buttons: [
          {
            icon: ButtonNames.COIN,
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
            icon: ButtonNames.FILE_CHECK,
            label: ButtonsLabels.PROJECT_MANAGEMENT,
            pathname: AppRoutes.projectManagement,
          },
        ],
      });
    return tabs;
  },
);
