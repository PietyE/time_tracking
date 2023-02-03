import { type FC } from 'react';
import { Box, Divider } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { TimeReportWorkItemsListItemDate } from './components/TimeReportWorkItemsListItemDate';
import { TimeReportWorkItemsListItemReportsList } from './components/TimeReportWorkItemsListItemReportsList';
import { useDays } from './helpers';
import { WorkItemForm } from 'shared/components/WorkItemForm';
import { workItemValidationSchema } from 'shared/validationSchema';
import { formatTimeToMinutes } from 'shared/utils/dateOperations';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { getSelectedDeveloperProject } from 'redux/selectors/timereports';
import { addWorkItem } from 'redux/asyncActions/timereports';
import type { WorkItem } from 'api/models/workItems';
import { styles } from './styles';

interface Fields {
  title: string;
  duration: string;
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
      title: '',
      duration: '0:00',
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
    !!errors.title?.message || !!errors.duration?.message;

  const onSubmit: SubmitHandler<Fields> = (data) => {
    if (!developerProjectId) return;
    void dispatch(
      addWorkItem({
        is_active: true,
        duration: formatTimeToMinutes(data.duration),
        title: data.title,
        developer_project: developerProjectId,
        date: `${year}-${month + 1}-${currentDayOrdinalNumber}`,
      }),
    );
    reset({ title: '', duration: '' });
  };

  return (
    <Box
      sx={styles}
      bgcolor='common.white'
      border={isCurrentDay ? 1 : 0}
      borderColor={isCurrentDay ? 'primary.main' : 'inherit'}
      borderRadius={1.5}
    >
      <WorkItemForm
        onSubmit={handleSubmit(onSubmit)}
        isValidationError={isValidationError}
        methods={methods}
      >
        <TimeReportWorkItemsListItemDate
          dayTitle={dayTitle}
          isWeekend={isWeekend}
        />
      </WorkItemForm>
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
