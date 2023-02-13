import { type FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { MemoizedPageHeader } from 'shared/components/PageHeader';

export const ProjectManagementHeader: FC = (): JSX.Element => (
  <MemoizedPageHeader title='Project Management'>
    <Button
      startIcon={<AddIcon />}
      variant='contained'
      sx={{
        fontWeight: (theme) => theme.typography.fontWeightSemiBold,
      }}
    >
      Add new project
    </Button>
  </MemoizedPageHeader>
);
