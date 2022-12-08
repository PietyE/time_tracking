import { PanelsNames } from '../constants';
import { AppRoutes } from 'constants/appRoutesConstants';
import type { NavButtonProps } from 'shared/components/NavButton/NavButton';

export type PanelButton = NavButtonProps & { pathname: AppRoutes };

export interface Panel {
  panelName: PanelsNames;
  buttons: PanelButton[];
}
