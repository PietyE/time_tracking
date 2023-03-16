import { type FC } from 'react';
import { Divider, Stack } from '@mui/material';
import { TimeReportWorkItemsListItemReportsListItem } from './components/TimeReportWorkItemsListItemReportsListItem';
import { TimeReportWorkItemsListItemReportsListTotalTime } from './components/TimeReportWorkItemsListItemReportsListTotalTime';
import type { WorkItem } from 'api/models/workItems';

interface Props {
  currentDayWorkItems: WorkItem[];
  currentDayOrdinalNumber: number;
}

export const TimeReportWorkItemsListItemReportsList: FC<Props> = ({
  currentDayWorkItems,
  currentDayOrdinalNumber,
}): JSX.Element => {
  const currentDayTotalTime: number = currentDayWorkItems?.reduce(
    (accumulator, nextValue) => accumulator + nextValue.duration,
    0,
  );

  return (
    <Stack>
      {currentDayWorkItems.map((currentDayWorkItem) => (
        <TimeReportWorkItemsListItemReportsListItem
          currentDayWorkItem={currentDayWorkItem}
          currentDayOrdinalNumber={currentDayOrdinalNumber}
          key={currentDayWorkItem.id}
        />
      ))}
      <Divider />
      <TimeReportWorkItemsListItemReportsListTotalTime
        currentDayTotalTime={currentDayTotalTime}
      />
    </Stack>
  );
};
