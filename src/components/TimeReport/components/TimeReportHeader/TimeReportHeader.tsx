import { type FC, useEffect } from 'react';
import { Typography } from '@mui/material';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import { PageNames } from 'constants/pageNames';
import { MemoizedPageHeader } from 'shared/components/PageHeader';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getConsolidatedReport } from 'redux/asyncActions/timereports';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import { SkeletonWrapper } from 'shared/components/SkeletonWrapper';
import {
  getConsolidatedReportsLoading,
  getUserTotalMonthWorkedTime,
} from 'redux/selectors/timereports';

export const TimeReportHeader: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const monthWorkedTime = useAppSelector(getUserTotalMonthWorkedTime);
  const isLoading = useAppSelector(getConsolidatedReportsLoading);
  const { debouncedMonth: month, debouncedYear: year } = useDebouncedMonths();

  const parsedMonthWorkedTime = monthWorkedTime
    ? parseMinToHoursAndMin(monthWorkedTime, true)
    : '0h 00m';

  useEffect(() => {
    void dispatch(getConsolidatedReport({ month: month + 1, year }));
  }, [dispatch, month, year]);

  return (
    <MemoizedPageHeader title={PageNames.TIME_REPORT}>
      <SkeletonWrapper
        isLoading={isLoading}
        width={300}
        height={50}
        animation='wave'
      >
        <Typography
          variant='h6'
          color='customGrey.MAIN_TEXT'
        >
          {`Total hours spend this month: ${parsedMonthWorkedTime}`}
        </Typography>
      </SkeletonWrapper>
    </MemoizedPageHeader>
  );
};
