import { type FC, useState } from 'react';
import { Delete, Edit, SwapHoriz } from '@mui/icons-material';
import { Button, Popover, type PopoverProps, Stack } from '@mui/material';
import { DeleteModal } from './DeleteModal';
import { SwapModal } from './SwapModal';
import { styles } from '../styles';
import { WorkItemsPermissions } from 'constants/permissions';
import { useAppShallowSelector } from 'hooks/redux';
import { getProfilePermissionsSelector } from 'redux/selectors/profile';
import type { UpdateWorkItemData } from 'api/models/workItems';

interface Props {
  anchorEl: Element | ((element: Element) => Element) | null;

  onClose: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void;

  onDeleteWorkItem: () => void;
  onUpdateWorkItem: (updatedWorkItemFields: UpdateWorkItemData) => void;
  toggleEditWorkItem: () => void;
}

export const WorkItemActions: FC<PopoverProps & Props> = ({
  id,
  open,
  anchorEl,
  onClose,
  onDeleteWorkItem,
  onUpdateWorkItem,
  toggleEditWorkItem,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  ...props
}): JSX.Element => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [isOpenSwapDialog, setIsOpenSwapDialog] = useState<boolean>(false);
  const permissions = useAppShallowSelector(getProfilePermissionsSelector);

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
    toggleEditWorkItem();
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
          {permissions?.includes(
            WorkItemsPermissions.work_items_change_workitem,
          ) && (
            <Button
              startIcon={<Edit />}
              color='black'
              fullWidth
              onClick={handleClickOpenEditDialog}
            >
              Edit the report
            </Button>
          )}
          <Button
            startIcon={<SwapHoriz />}
            color='black'
            fullWidth
            onClick={handleClickOpenSwapDialog}
          >
            Swap to other project
          </Button>
          {permissions?.includes(
            WorkItemsPermissions.work_items_delete_workitem,
          ) && (
            <Button
              startIcon={<Delete />}
              color='black'
              fullWidth
              onClick={handleClickOpenDeleteDialog}
            >
              Delete the report
            </Button>
          )}
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
