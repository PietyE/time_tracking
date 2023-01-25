import { type FC } from 'react';
import { Divider, Stack } from '@mui/material';
import { TimeReportWorkItemsListItemReportsListItem } from './components/TimeReportWorkItemsListItemReportsListItem';
import { TimeReportWorkItemsListItemReportsListTotalTime } from './components/TimeReportWorkItemsListItemReportsListTotalTime';

interface MockItem {
  text: string;
  time: string;

  id: number;
}

const workItems: MockItem[] = [
  {
    text: 'Text',
    time: '1:00',

    id: 124,
  },
  {
    text: 'Text',
    time: '2:00',

    id: 123,
  },
  {
    text: 'Text',
    time: '3:00',

    id: 125,
  },
];

export const TimeReportWorkItemsListItemReportsList: FC = (): JSX.Element => (
  <Stack>
    {!!workItems.length &&
      workItems.map((workItem) => (
        <TimeReportWorkItemsListItemReportsListItem key={workItem.id} />
      ))}
    {!!workItems.length && <Divider />}
    {!!workItems.length && <TimeReportWorkItemsListItemReportsListTotalTime />}
  </Stack>
);
