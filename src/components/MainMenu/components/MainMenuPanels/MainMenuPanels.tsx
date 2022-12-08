import { type FC, useMemo } from 'react';
import Clock from 'assets/svg/Clock';
import Coin from 'assets/svg/Coin';
import FileCheck from 'assets/svg/FileCheck';
import Vilmates from 'assets/svg/Vilmates';
import { AppRoutes } from 'constants/appRoutesConstants';
import { PagesViewPermissions } from 'constants/permissions';
import { getProfilePermissionsSelector } from 'redux/slices/profile';
import { useAppShallowSelector } from 'hooks/redux';
import type { Panel } from './types';

export const MainMenuPanels: FC = (): JSX.Element => {
  const permissions = useAppShallowSelector(getProfilePermissionsSelector);

  const panels: Panel[] = useMemo(() => {
    const tabs = [];
    tabs.push(
      {
        panelName: 'My work',
        items: permissions?.includes(
          PagesViewPermissions.users_can_view_vilmates,
        )
          ? [
              {
                icon: <Clock />,
                label: 'Time report',
                smallSize: true,
                pathname: AppRoutes.timeReport,
              },
              {
                icon: <Vilmates />,
                label: 'Vilmates',
                smallSize: true,
                pathname: AppRoutes.vilmates,
              },
            ]
          : [
              {
                icon: <Clock />,
                label: 'Time report',
                smallSize: true,
                pathname: AppRoutes.timeReport,
              },
            ],
      },
      {
        panelName: 'Accounting',
        items: [
          {
            icon: <Coin />,
            label: 'Project report',
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
        panelName: 'Management',
        items: [
          {
            icon: <FileCheck />,
            label: 'Project management',
            smallSize: true,
            pathname: AppRoutes.projectManagement,
          },
        ],
      });
    return tabs;
  }, [permissions]);

  console.log(panels);

  return <div>hello</div>;
};
