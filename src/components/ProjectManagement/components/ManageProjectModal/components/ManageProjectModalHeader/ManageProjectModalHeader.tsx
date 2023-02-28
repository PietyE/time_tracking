import { type FC } from 'react';
import { Close } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import api from 'api';
import { Archive } from 'shared/components/svg/Archive';
import { Export } from 'shared/components/svg/Export';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { archiveProject } from 'redux/asyncActions/projectManagement';
import { closeModal } from 'redux/slices/projectManagements';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import { downloadFile } from 'shared/utils/downloadFile';
import { getManageModalProjectInfo } from 'redux/selectors/projectManagement';

export const ManageProjectModalHeader: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { debouncedYear, debouncedMonth } = useDebouncedMonths();
  const project = useAppShallowSelector(getManageModalProjectInfo);

  const handleArchive = (id: string): void => {
    void dispatch(archiveProject(id));
    dispatch(closeModal());
  };

  const handleClose = (): void => {
    dispatch(closeModal());
  };

  const exportCsv = async (): Promise<void> => {
    try {
      const response = await api.projects.getProjectsReport({
        month: debouncedMonth + 1,
        year: debouncedYear,
        id: project.id,
      });
      const fileName = response.headers['content-disposition'].split('"')[1];
      if (response && response.data instanceof Blob) {
        downloadFile(response.data, fileName);
      }
    } catch (error) {
      toast.error('Something went wrong...');
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      py={12}
      px={24}
    >
      <Typography variant='h5'>{project?.name}</Typography>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='flex-start'
        sx={{
          '& > hr, button': {
            mr: 20,
          },
          '& button:last-child': {
            mr: 0,
          },
        }}
      >
        <IconButton onClick={exportCsv}>
          <Export />
        </IconButton>
        <IconButton onClick={() => handleArchive(project?.id)}>
          <Archive />
        </IconButton>
        <Divider
          orientation='horizontal'
          flexItem
          sx={{
            background: (theme) =>
              theme.palette.customGrey.STROKE_FORM_OPACITY_20,
            width: '1px',
          }}
        />
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};
