import type { ReactElement } from 'react';
import { AppRoutes } from 'constants/appRoutesConstants';

interface PanelButton {
  icon: ReactElement;
  label: string;
  pathname: AppRoutes;
}

export interface Panel {
  panelName: string;
  items: PanelButton[];
  smallSize?: boolean;
}
