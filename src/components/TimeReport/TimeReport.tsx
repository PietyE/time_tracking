import { type FC } from 'react';
import { TimeReportHeader } from './components/TimeReportHeader';
import { TimeReportWorkItemsList } from './components/TimeReportWorkItemsList';

export const TimeReport: FC = (): JSX.Element => (
  <>
    <TimeReportHeader />
    <TimeReportWorkItemsList />
  </>
);
