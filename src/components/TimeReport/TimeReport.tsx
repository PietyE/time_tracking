import { type FC } from 'react';
import { TimeReportHeader } from './components/TimeReportHeader';
import { TimeReportWorkItemsList } from './components/TimeReportWorkItemsList';
import { TimeReportWorkItemsListFilters } from './components/TimeReportWorkItemsListFilters';

export const TimeReport: FC = (): JSX.Element => (
  <>
    <TimeReportHeader />
    <TimeReportWorkItemsListFilters />
    <TimeReportWorkItemsList />
  </>
);
