import { createTypedSelector } from '../utils';
import type { WorkItem } from 'api/models/workItems';

export const getWorkItems = createTypedSelector<WorkItem[]>(
  (state) => state.timereports.workItems,
);
