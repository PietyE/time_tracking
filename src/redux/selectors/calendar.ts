import { createTypedSelector } from '../utils';

export const getCalendarMonth = createTypedSelector<number>(
  (state) => state.calendar.month,
);
export const getCalendarYear = createTypedSelector<number>(
  (state) => state.calendar.year,
);
