import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { createStyles } from '../../../../../styles';
import { TimeReportWorkItemsListItemReport } from '../../../../TimeReportWorkItemsListItemReport';
import { TimeReportWorkItemsListItemButton } from '../../../../TimeReportWorkItemsListItemButton';
import { TimeReportWorkItemsListItemTime } from '../../../../TimeReportWorkItemsListItemTime';
import { useAppDispatch } from 'hooks/redux';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import { toggleEdit } from 'redux/slices/timereports';
import { formatTimeToMinutes } from 'shared/utils/dateOperations';
import { editWorkItemValidationSchema } from 'shared/validationSchema';
import type { UpdateWorkItemData } from 'api/models/workItems';

interface Fields {
  title: string;
  duration: string;
}

interface Props {
  title: string;
  duration: string;
  onUpdateWorkItem: (updatedWorkItemFields: UpdateWorkItemData) => void;
  currentDayOrdinalNumber: number;
}

export const EditingWorkItemForm: FC<Props> = ({
  title,
  duration,
  onUpdateWorkItem,
  currentDayOrdinalNumber,
}): JSX.Element => {
  const { debouncedYear: year, debouncedMonth: month } = useDebouncedMonths();
  const dispatch = useAppDispatch();
  const methods = useForm<Fields>({
    mode: 'onChange',
    resolver: yupResolver(editWorkItemValidationSchema),
    defaultValues: {
      title,
      duration,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const isValidationError: boolean =
    !!errors.title?.message || !!errors.duration?.message;

  const onSubmit: SubmitHandler<Fields> = (data, event) => {
    if (data.duration === duration && data.title === title) return;
    event?.stopPropagation();
    onUpdateWorkItem({
      duration: formatTimeToMinutes(data.duration),
      title: data.title,
      date: `${year}-${month + 1}-${currentDayOrdinalNumber}`,
    });
    dispatch(toggleEdit());
  };
  return (
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
        ></Grid>
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
  );
};
