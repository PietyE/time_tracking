import { type FC } from 'react';
import { Box, Divider, Modal } from '@mui/material';
import { ManageProjectModalGeneralInformation } from './components/ManageProjectModalGeneralInformation';
import { ManageProjectModalHeader } from './components/ManageProjectModalHeader';
import { SkeletonWrapper } from '../../../../shared/components/SkeletonWrapper';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  getProjectManagementLoading,
  getProjectManageModalIsOpen,
} from 'redux/selectors/projectManagement';
import { closeModal } from 'redux/slices/projectManagements';

export const ManageProjectModal: FC = (): JSX.Element => {
  const isOpen = useAppSelector(getProjectManageModalIsOpen);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getProjectManagementLoading);

  const handleClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        backdropFilter: 'none',
      }}
    >
      <Box
        position='absolute'
        top='45vh'
        right='-14%'
        width={530}
        boxShadow={1}
        border={1}
        borderColor='text.disabled'
        borderRadius={5}
        bgcolor='common.white'
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SkeletonWrapper
          isLoading={isLoading}
          width={1}
          height={550}
          animation='wave'
        >
          <ManageProjectModalHeader />
          <Divider />
          <ManageProjectModalGeneralInformation />
        </SkeletonWrapper>
      </Box>
    </Modal>
  );
};
