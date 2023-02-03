import { type FC, type MouseEvent } from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import { styles } from './styles';

interface Props {
  isOpenDeleteDialog: boolean;

  onClose: (event: Object, reason?: string) => void;

  onClick: () => void;

  title: string;
}

export const DeleteModal: FC<Props> = ({
  isOpenDeleteDialog,
  onClose,
  onClick,
  title,
}): JSX.Element => {
  const handleDelete = (
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    onClick();
    onClose(event);
  };
  return (
    <Dialog
      open={isOpenDeleteDialog}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={styles.dialogContainer}
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogActions sx={styles.dialogActions}>
        {/* @ts-expect-error */}
        <Button
          onClick={handleDelete}
          autoFocus
          variant='contained'
          fullWidth
        >
          Yes
        </Button>
        <Button
          onClick={onClose}
          variant='contained'
          fullWidth
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
