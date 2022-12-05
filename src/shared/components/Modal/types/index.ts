import type { MouseEvent } from 'react';

export type ButtonAction = (event?: MouseEvent<HTMLElement>) => void;

interface NowAllowedSingleActionButtonProps {
  leftButtonActionText?: never;
  rightButtonActionText?: never;
  leftButtonAction?: never;
  rightButtonAction?: never;
  isSingleButton?: never;
}

interface NowAllowedTwoActionsButtonProps {
  singleButtonActionText?: never;
  singleButtonAction?: never;
}

export type SingleActionButton = {
  singleButtonActionText: string;
  singleButtonAction: ButtonAction;
} & NowAllowedSingleActionButtonProps;

export type TwoActionsButton = {
  leftButtonActionText: string;
  rightButtonActionText: string;
  leftButtonAction: ButtonAction;
  rightButtonAction: ButtonAction;
  isSingleButton: false;
} & NowAllowedTwoActionsButtonProps;
