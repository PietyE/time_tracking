import { createSelector } from '@reduxjs/toolkit';
import { getSelectedDeveloper } from './timereports';
import { createTypedSelector } from '../utils';
import type { ConsolidatedReport } from 'api/models/users';

export const getConsolidatedReport = createTypedSelector<ConsolidatedReport[]>(
  (state) => state.consolidatedReport.data,
);

export const getConsolidatedReportLoading = createTypedSelector<boolean>(
  (state) => state.consolidatedReport.isLoading,
);

export const getUserTotalMonthWorkedTime = createSelector(
  [getConsolidatedReport, getSelectedDeveloper],
  (consolidatedReport, developer) =>
    consolidatedReport
      ?.filter((report) => report.id === developer.id)
      ?.map((userReport) => userReport.total_minutes)[0],
);
