import { useAppSelector } from './redux';
import { useDebounce } from './useDebounce';
import { getCalendarMonth, getCalendarYear } from 'redux/selectors/calendar';

interface ReturnType {
  debouncedYear: number;
  debouncedMonth: number;
}

export const useDebouncedMonths = (): ReturnType => {
  const month = useAppSelector(getCalendarMonth);
  const year = useAppSelector(getCalendarYear);
  const debouncedMonth = useDebounce(month, 300);
  const debouncedYear = useDebounce(year, 300);

  return { debouncedYear, debouncedMonth };
};
