import { type FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { CreateProjectModal } from '../CreateProjectModal';
import { MemoizedPageHeader } from 'shared/components/PageHeader';

export const ProjectManagementHeader: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggle = (): void => setIsModalOpen(!isModalOpen);

  return (
    <>
      <MemoizedPageHeader title='Project Management'>
        <Button
          startIcon={<AddIcon />}
          variant='contained'
          onClick={handleToggle}
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightSemiBold,
          }}
        >
          Add new project
        </Button>
      </MemoizedPageHeader>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleToggle}
      />
    </>
  );
};
