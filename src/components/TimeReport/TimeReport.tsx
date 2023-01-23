import { type FC } from 'react';
import { Typography } from '@mui/material';
import { PageNames } from 'constants/pageNames';
import { PageHeader } from 'shared/components/PageHeader';

export const TimeReport: FC = (): JSX.Element => (
  <PageHeader title={PageNames.TIME_REPORT}>
    <Typography
      variant='h6'
      color='customGrey.MAIN_TEXT'
    >
      Total hours spend this month:
    </Typography>
  </PageHeader>
);
