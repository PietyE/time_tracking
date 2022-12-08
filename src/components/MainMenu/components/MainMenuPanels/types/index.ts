import type { ReactElement } from 'react';
import { AppRoutes } from 'constants/appRoutesConstants';

export interface PanelButton {
  icon: ReactElement;
  label: string;
  pathname: AppRoutes;
  smallSize?: boolean;
}

export interface Panel {
  panelName: string;
  items: PanelButton[];
}
