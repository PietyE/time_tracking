import { type FC, type MouseEvent, useState } from 'react';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAppShallowSelector } from 'hooks/redux';
import { getOnlyActiveProject } from 'redux/selectors/developerProjects';
import { getSelectedDeveloperProject } from 'redux/selectors/timereports';
import { SelectProjectFilter } from 'shared/components/SelectProjectFilter';
import type { UpdateWorkItemData, WorkItem } from 'api/models/workItems';
import type { DeveloperProject } from 'api/models/developerProjects';
import { styles } from './styles';

interface Props {
  isOpenSwapDialog: boolean;

  onClose: (event?: Object, reason?: string) => void;

  onClick: (updatedWorkItemFields: UpdateWorkItemData) => void;

  title: string;
}

export const SwapModal: FC<Props> = ({
  isOpenSwapDialog,
  onClose,
  onClick,
  title,
}): JSX.Element => {
  const developerProjects = useAppShallowSelector(getOnlyActiveProject);
  const developerProject = useAppShallowSelector(getSelectedDeveloperProject);
  const [swapProject, setSwapProject] =
    useState<DeveloperProject>(developerProject);
  const onSelectProjectToSwap = (developerProject: DeveloperProject): void =>
    setSwapProject(developerProject);

  const handleUpdateWorkItem = (
    _event: MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const workItemToSwap = {
      developer_project: swapProject.id,
    } as Partial<
      Pick<WorkItem, 'title' | 'duration' | 'date' | 'developer_project'>
    >;
    onClick(workItemToSwap);
    onClose();
  };

  return (
    <div>
      <Dialog
        open={isOpenSwapDialog}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={styles.dialogContainer}
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Stack alignItems='center'>
              <Box
                mb={24}
                width={1}
              >
                <Typography
                  mb={15}
                  component='p'
                >
                  From
                </Typography>
                <TextField
                  disabled
                  value={developerProject.project.name}
                  fullWidth
                  label='Current project'
                  sx={styles.swapDialogSelectedProject}
                />
              </Box>
              <SwapVertIcon />
              <Box
                mt={24}
                width={1}
              >
                <Typography
                  mb={15}
                  component='p'
                >
                  To
                </Typography>
                <SelectProjectFilter
                  developerProjects={developerProjects}
                  onChange={onSelectProjectToSwap}
                />
              </Box>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button
            onClick={onClose}
            variant='contained'
            fullWidth
          >
            Close
          </Button>
          {/* @ts-expect-error */}
          <Button
            onClick={handleUpdateWorkItem}
            autoFocus
            variant='contained'
            fullWidth
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
