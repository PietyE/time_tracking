import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { WorkItemForm } from 'shared/components/WorkItemForm';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import { formatTimeToMinutes } from 'shared/utils/dateOperations';
import { workItemValidationSchema } from 'shared/validationSchema';
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
  toggleEditWorkItem: () => void;
}

export const EditingWorkItemForm: FC<Props> = ({
  title,
  duration,
  onUpdateWorkItem,
  currentDayOrdinalNumber,
  toggleEditWorkItem,
}): JSX.Element => {
  const { debouncedYear: year, debouncedMonth: month } = useDebouncedMonths();
  const methods = useForm<Fields>({
    mode: 'onChange',
    resolver: yupResolver(workItemValidationSchema),
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

  const onSubmit: SubmitHandler<Fields> = (data) => {
    if (data.duration === duration && data.title === title) return;
    onUpdateWorkItem({
      duration: formatTimeToMinutes(data.duration),
      title: data.title,
      date: `${year}-${month + 1}-${currentDayOrdinalNumber}`,
    });
    toggleEditWorkItem();
  };

  return (
    <WorkItemForm
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      isValidationError={isValidationError}
    />
  );
};
