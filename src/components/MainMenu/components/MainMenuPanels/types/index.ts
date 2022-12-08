import type { ReactElement } from 'react';
import { ButtonsLabels, PanelsNames } from '../constants';
import { AppRoutes } from 'constants/appRoutesConstants';

export interface PanelButton {
  icon: ReactElement;
  label: ButtonsLabels;
  pathname: AppRoutes;
  smallSize?: boolean;
}

export interface Panel {
  panelName: PanelsNames;
  buttons: PanelButton[];
}
