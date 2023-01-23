import { type FC } from 'react';
import { Stack } from '@mui/material';
import { TimeReportWorkItemsListHeader } from './components/TimeReportWorkItemsListHeader';

export const TimeReportWorkItemsList: FC = (): JSX.Element => (
  <Stack>
    <TimeReportWorkItemsListHeader />
  </Stack>
);
