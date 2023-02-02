import { type FC, useState } from 'react';
import { Delete, Edit, SwapHoriz } from '@mui/icons-material';
import { Button, Popover, type PopoverProps, Stack } from '@mui/material';
import { DeleteModal } from './DeleteModal';
import { SwapModal } from './SwapModal';
import { styles } from '../styles';
import { useAppDispatch } from 'hooks/redux';
import { toggleEdit } from 'redux/slices/timereports';
import type { UpdateWorkItemData } from 'api/models/workItems';

interface Props {
  anchorEl: Element | ((element: Element) => Element) | null;

  onClose: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void;

  onDeleteWorkItem: () => void;
  onUpdateWorkItem: (updatedWorkItemFields: UpdateWorkItemData) => void;
}

export const WorkItemActions: FC<PopoverProps & Props> = ({
  id,
  open,
  anchorEl,
  onClose,
  onDeleteWorkItem,
  onUpdateWorkItem,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  ...props
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenSwapDialog, setIsOpenSwapDialog] = useState(false);

  const handleClickOpenDeleteDialog = (): void => {
    onClose();
    setIsOpenDeleteDialog(true);
  };

  const handleClickOpenSwapDialog = (): void => {
    onClose();
    setIsOpenSwapDialog(true);
  };

  const handleClickOpenEditDialog = (): void => {
    onClose();
    void dispatch(toggleEdit());
  };

  const handleCloseDeleteDialog = (): void => setIsOpenDeleteDialog(false);

  const handleCloseSwapDialog = (): void => setIsOpenSwapDialog(false);

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        transitionDuration={150}
        {...props}
      >
        <Stack
          p={8}
          sx={styles.popup}
        >
          <Button
            startIcon={<Edit />}
            color='black'
            fullWidth
            onClick={handleClickOpenEditDialog}
          >
            Edit the report
          </Button>
          <Button
            startIcon={<SwapHoriz />}
            color='black'
            fullWidth
            onClick={handleClickOpenSwapDialog}
          >
            Swap to other project
          </Button>
          <Button
            startIcon={<Delete />}
            color='black'
            fullWidth
            onClick={handleClickOpenDeleteDialog}
          >
            Delete the report
          </Button>
        </Stack>
      </Popover>
      <DeleteModal
        isOpenDeleteDialog={isOpenDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onClick={onDeleteWorkItem}
        title='Are you sure that you want to delete this report?'
      />
      <SwapModal
        isOpenSwapDialog={isOpenSwapDialog}
        onClose={handleCloseSwapDialog}
        title='Changing project for work item'
        onClick={onUpdateWorkItem}
      />
    </>
  );
};
