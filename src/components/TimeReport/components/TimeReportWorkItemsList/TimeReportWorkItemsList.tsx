import { type FC, useEffect } from 'react';
import { Stack } from '@mui/material';
import { TimeReportWorkItemsListHeader } from './components/TimeReportWorkItemsListHeader';
import { TimeReportWorkItemsListItem } from './components/TimeReportWorkItemsListItem';
import { useScrollLock } from 'hooks/useScrollLock';
import { getTotalHoursOfProject } from 'shared/utils/dateOperations';
import Loading from 'shared/components/Loading';
import { useDebounce } from 'hooks/useDebounce';
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowSelector,
} from 'hooks/redux';
import {
  getSelectedDeveloperProject,
  getTimeReportDays,
  getWorkItems as getWorkItemsSelector,
  getWorkItemsLoading,
} from 'redux/selectors/timereports';
import { getWorkItems } from 'redux/asyncActions/timereports';
import type { WorkItem } from 'api/models/workItems';

export const TimeReportWorkItemsList: FC = (): JSX.Element => {
  const workItems = useAppShallowSelector(getWorkItemsSelector);
  const { id: developerProjectId } = useAppShallowSelector(
    getSelectedDeveloperProject,
  );
  const dispatch = useAppDispatch();
  const { daysOfMonth, todayDate, daysInMonth, month, year } =
    useAppShallowSelector(getTimeReportDays);
  const debouncedMonth = useDebounce(month, 300);
  const debouncedYear = useDebounce(year, 300);

  const totalHoursOfSelectedProject: string = getTotalHoursOfProject(
    workItems,
    ['duration'],
  );

  useEffect(() => {
    if (!developerProjectId) return;
    void dispatch(
      getWorkItems({
        developer_project: developerProjectId,
        year,
        month: month + 1,
      }),
    );
  }, [developerProjectId, debouncedMonth, debouncedYear, dispatch]);

  const renderWorkItemsList: JSX.Element[] = daysOfMonth.map(
    (dayOrdinalNumber) => {
      const currentDayOrdinalNumber: number = daysInMonth - dayOrdinalNumber;
      const currentDayWorkItems: WorkItem[] = workItems.filter(
        (report) => currentDayOrdinalNumber === new Date(report.date).getDate(),
      );
      const isCurrentDay: boolean =
        todayDate.getDate() === currentDayOrdinalNumber &&
        todayDate.getMonth() === month &&
        todayDate.getFullYear() === year;
      return (
        <TimeReportWorkItemsListItem
          currentDayWorkItems={currentDayWorkItems}
          isCurrentDay={isCurrentDay}
          currentDayOrdinalNumber={currentDayOrdinalNumber}
          key={dayOrdinalNumber}
        />
      );
    },
  );

  return (
    <Stack>
      <TimeReportWorkItemsListHeader
        hoursWorked={totalHoursOfSelectedProject}
      />
      <Loader />
      {renderWorkItemsList}
    </Stack>
  );
};

const Loader: FC = (): JSX.Element => {
  const isLoading = useAppSelector(getWorkItemsLoading);
  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
