import { ButtonNames, PanelsNames } from '../constants';
import { AppRoutes } from 'constants/appRoutesConstants';
import type { NavButtonProps } from 'shared/components/NavButton/NavButton';

export type PanelButton = Omit<NavButtonProps, 'icon'> & {
  pathname: AppRoutes;
} & { icon: ButtonNames };

export interface Panel {
  panelName: PanelsNames;
  buttons: PanelButton[];
}
