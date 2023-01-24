import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TimeInput } from 'shared/components/TimeInput';
import { ValidationErrorMessage } from 'shared/components/ValidationErrorMessage';

export const TimeReportWorkItemsListItemTime: FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TimeInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            mask='9:99'
            placeholder='0:00'
            maskChar='0'
            error={!!errors.time?.message}
          />
        )}
        control={control}
        name='time'
      />
      <ValidationErrorMessage>
        {errors.time?.message as string}
      </ValidationErrorMessage>
    </>
  );
};
