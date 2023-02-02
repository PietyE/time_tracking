import { type FC } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { TimeReportWorkItemsListItemButton } from './components/TimeReportWorkItemsListItemButton';
import { TimeReportWorkItemsListItemDate } from './components/TimeReportWorkItemsListItemDate';
import { TimeReportWorkItemsListItemReport } from './components/TimeReportWorkItemsListItemReport';
import { TimeReportWorkItemsListItemReportsList } from './components/TimeReportWorkItemsListItemReportsList';
import { TimeReportWorkItemsListItemTime } from './components/TimeReportWorkItemsListItemTime';
import { useDays } from './helpers';
import { workItemValidationSchema } from 'shared/validationSchema';
import { formatTimeToMinutes } from 'shared/utils/dateOperations';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { getSelectedDeveloperProject } from 'redux/selectors/timereports';
import { addWorkItem } from 'redux/asyncActions/timereports';
import type { WorkItem } from 'api/models/workItems';
import { createStyles } from './styles';

interface Fields {
  reportText: string;
  time: string;
}

interface Props {
  currentDayOrdinalNumber: number;
  currentDayWorkItems: WorkItem[];
  isCurrentDay: boolean;
}

export const TimeReportWorkItemsListItem: FC<Props> = ({
  currentDayOrdinalNumber,
  currentDayWorkItems,
  isCurrentDay,
}): JSX.Element => {
  const methods = useForm<Fields>({
    mode: 'onChange',
    resolver: yupResolver(workItemValidationSchema),
    defaultValues: {
      reportText: '',
      time: '0:00',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { debouncedYear: year, debouncedMonth: month } = useDebouncedMonths();
  const { id: developerProjectId } = useAppShallowSelector(
    getSelectedDeveloperProject,
  );
  const dispatch = useAppDispatch();
  const { isWeekend, dayTitle } = useDays(year, month, currentDayOrdinalNumber);

  const isValidationError: boolean =
    !!errors.reportText?.message || !!errors.time?.message;

  const onSubmit: SubmitHandler<Fields> = (data) => {
    if (!developerProjectId) return;
    void dispatch(
      addWorkItem({
        is_active: true,
        duration: formatTimeToMinutes(data.time),
        title: data.reportText,
        developer_project: developerProjectId,
        date: `${year}-${month + 1}-${currentDayOrdinalNumber}`,
      }),
    );
    reset({ reportText: '', time: '' });
  };

  return (
    <Box
      sx={createStyles(isValidationError).wrapper}
      bgcolor='common.white'
      border={isCurrentDay ? 1 : 0}
      borderColor={isCurrentDay ? 'primary.main' : 'inherit'}
      borderRadius={1.5}
    >
      <FormProvider {...methods}>
        <Grid
          container
          component='form'
          columnSpacing={24}
          alignItems='center'
          maxWidth={971}
          sx={createStyles(isValidationError).container}
          onSubmit={handleSubmit(onSubmit)}
          ml={0}
        >
          <Grid
            item
            xs={3}
            p={0}
          >
            <TimeReportWorkItemsListItemDate
              dayTitle={dayTitle}
              isWeekend={isWeekend}
            />
          </Grid>
          <Grid
            item
            xs={7}
            position='relative'
          >
            <TimeReportWorkItemsListItemReport />
          </Grid>
          <Grid
            item
            xs={1.1}
            position='relative'
          >
            <TimeReportWorkItemsListItemTime />
          </Grid>
          <Grid
            item
            xs={0.9}
          >
            <TimeReportWorkItemsListItemButton />
          </Grid>
        </Grid>
      </FormProvider>
      <Divider />
      {!!currentDayWorkItems.length && (
        <TimeReportWorkItemsListItemReportsList
          currentDayWorkItems={currentDayWorkItems}
          currentDayOrdinalNumber={currentDayOrdinalNumber}
        />
      )}
    </Box>
  );
};
