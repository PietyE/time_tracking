import { type FC } from 'react';
import { Button } from '@mui/material';
import { PageHeader } from 'shared/components/PageHeader';
import { GoogleDrive } from 'shared/components/svg/GoogleDrive';
import { styles } from './styles';

export const ProjectReportHeader: FC = (): JSX.Element => (
  <PageHeader title='Project Report'>
    <Button
      variant='outlined'
      startIcon={<GoogleDrive />}
      type='button'
      sx={styles}
    >
      Sync with Drive
    </Button>
  </PageHeader>
);
