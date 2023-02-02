import { type FC, type MouseEvent } from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';

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
      sx={{
        '& .MuiPaper-root': {
          py: 20,
          px: 100,
          borderRadius: 5,
        },
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
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
