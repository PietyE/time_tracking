import type { FC, MouseEvent } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Modal as MUIModal,
  type ModalProps as MUIModalProps,
  Stack,
} from '@mui/material';
import { ModalActions } from './components/ModalActions';
import { ModalHeader } from './components/ModalHeader';
import Close from 'shared/components/svg/Close';
import type { SingleActionButton, TwoActionsButton } from './types';
import { styles } from './styles';

interface ModalProps {
  open: boolean;
  onClose: (
    event: MouseEvent<HTMLElement>,
    reason?: 'backdropClick' | 'escapeKeyDown',
  ) => void;
  isSingleButton?: boolean;
}

type ButtonActionVariant = SingleActionButton | TwoActionsButton;

type Props = ModalProps & MUIModalProps & ButtonActionVariant & { sx?: never };

export const Modal: FC<Props> = ({
  children,
  open,
  onClose,
  isSingleButton = true,
  singleButtonActionText = 'Button',
  leftButtonActionText = 'Left Button',
  rightButtonActionText = 'Right Button',
  singleButtonAction = () => {},
  leftButtonAction = () => {},
  rightButtonAction = () => {},
  ...props
}): JSX.Element => {
  return (
    <MUIModal
      open={open}
      onClose={onClose}
      disableAutoFocus
      disableEnforceFocus
      sx={styles.modal}
      {...props}
    >
      <Stack
        position='relative'
        width={640}
        minHeight={300}
        sx={styles.modalContainer}
      >
        <ModalHeader title='Title' />
        <Divider />
        <Box flex='1 1 auto'>{children}</Box>
        <ModalActions
          isSingleButton={isSingleButton}
          singleButtonActionText={singleButtonActionText}
          leftButtonActionText={leftButtonActionText}
          rightButtonActionText={rightButtonActionText}
          singleButtonAction={singleButtonAction}
          leftButtonAction={leftButtonAction}
          rightButtonAction={rightButtonAction}
        />
        <IconButton
          sx={styles.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </Stack>
    </MUIModal>
  );
};
