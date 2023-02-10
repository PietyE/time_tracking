import { createSelector } from '@reduxjs/toolkit';
import { getCalendarMonth, getCalendarYear } from './calendar';
import { createTypedSelector } from '../utils';
import { getDaysInMonth } from 'shared/utils/dateOperations';
import type { DeveloperProject } from 'api/models/developerProjects';
import type { User } from 'api/models/users';
import type { WorkItem } from 'api/models/workItems';

export const _getWorkItems = createTypedSelector<WorkItem[]>(
  (state) => state.timereports.workItems,
);

export const getWorkItemsLoading = createTypedSelector<boolean>(
  (state) => state.timereports.isLoading,
);

export const getSelectedDeveloperProject =
  createTypedSelector<DeveloperProject>(
    (state) => state.timereports.selectedProject,
  );

export const getSelectedDeveloper = createTypedSelector<
  Omit<User, 'permissions'>
>((state) => state.timereports.selectedDeveloper);

export const getWorkItems = createSelector([_getWorkItems], (workItems) =>
  workItems.length ? workItems.filter((workItem) => workItem.is_active) : [],
);

export const getTimeReportDays = createSelector(
  [getCalendarMonth, getCalendarYear],
  (month, year) => {
    const todayDate: Date = new Date();

    const daysInMonth: number =
      year === todayDate.getFullYear() && month === todayDate.getMonth()
        ? todayDate.getDate()
        : getDaysInMonth(new Date(year, month));

    const daysOfMonth: number[] = [];

    for (let i = 0; i < daysInMonth; i++) {
      daysOfMonth.push(i);
    }

    return {
      daysOfMonth,
      todayDate,
      daysInMonth,
      month,
      year,
    };
  },
);
