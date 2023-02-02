import { type FC, useEffect } from 'react';
import { Typography } from '@mui/material';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import { PageNames } from 'constants/pageNames';
import { PageHeader } from 'shared/components/PageHeader';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  getConsolidatedReportLoading,
  getUserTotalMonthWorkedTime,
} from 'redux/selectors/consolidatedReport';
import { getConsolidatedReport } from 'redux/asyncActions/consolidatedReport';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import { SkeletonWrapper } from 'shared/components/SkeletonWrapper';

export const TimeReportHeader: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const monthWorkedTime = useAppSelector(getUserTotalMonthWorkedTime);
  const isLoading = useAppSelector(getConsolidatedReportLoading);
  const { debouncedMonth: month, debouncedYear: year } = useDebouncedMonths();

  const parsedMonthWorkedTime = monthWorkedTime
    ? parseMinToHoursAndMin(monthWorkedTime, true)
    : '0h 00m';

  useEffect(() => {
    void dispatch(getConsolidatedReport({ month: month + 1, year }));
  }, [dispatch, month, year]);

  return (
    <PageHeader title={PageNames.TIME_REPORT}>
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
    </PageHeader>
  );
};
