import { createTypedSelector } from '../utils';
import type { ConsolidatedReport } from 'api/models/users';

export const getConsolidatedReport = createTypedSelector<ConsolidatedReport[]>(
  (state) => state.consolidatedReport.data,
);

export const getConsolidatedReportLoading = createTypedSelector<boolean>(
  (state) => state.consolidatedReport.isLoading,
);
