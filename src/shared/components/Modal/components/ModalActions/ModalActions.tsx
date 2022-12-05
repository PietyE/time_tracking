import type { FC } from 'react';
import { Button, ButtonGroup, type SxProps, type Theme } from '@mui/material';
import type { ButtonAction } from '../../types';
import { styles } from './styles';

interface Props {
  isSingleButton: boolean;
  singleButtonActionText: string;
  leftButtonActionText: string;
  rightButtonActionText: string;
  singleButtonAction: ButtonAction;
  leftButtonAction: ButtonAction;
  rightButtonAction: ButtonAction;
}

export const ModalActions: FC<Props> = ({
  isSingleButton,
  singleButtonActionText,
  leftButtonActionText,
  rightButtonActionText,
  singleButtonAction,
  leftButtonAction,
  rightButtonAction,
}): JSX.Element => {
  const buttons: JSX.Element = isSingleButton ? (
    <Button onClick={singleButtonAction}>{singleButtonActionText}</Button>
  ) : (
    <>
      <Button onClick={leftButtonAction}>{leftButtonActionText}</Button>
      <Button onClick={rightButtonAction}>{rightButtonActionText}</Button>
    </>
  );

  const _styles: SxProps<Theme> = isSingleButton
    ? styles.singleButton
    : styles.twoButtons;

  return (
    <ButtonGroup
      color='primary'
      variant='contained'
      fullWidth
      sx={_styles}
    >
      {buttons}
    </ButtonGroup>
  );
};
