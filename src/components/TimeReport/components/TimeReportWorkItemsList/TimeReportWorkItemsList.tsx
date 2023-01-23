import { type FC } from 'react';
import { Stack } from '@mui/material';
import { TimeReportWorkItemsListHeader } from './components/TimeReportWorkItemsListHeader';
import { TimeReportWorkItemsListItem } from './components/TimeReportWorkItemsListItem';

const mockList = [1, 2, 3, 4];

export const TimeReportWorkItemsList: FC = (): JSX.Element => (
  <Stack>
    <TimeReportWorkItemsListHeader />
    {mockList.map((el) => (
      <TimeReportWorkItemsListItem key={el} />
    ))}
  </Stack>
);
