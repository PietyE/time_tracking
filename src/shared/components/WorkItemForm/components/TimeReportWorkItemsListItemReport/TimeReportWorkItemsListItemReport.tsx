import { type FC } from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ValidationErrorMessage } from 'shared/components/ValidationErrorMessage';

export const TimeReportWorkItemsListItemReport: FC = (): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <TextField
        maxRows='8'
        placeholder='What did you work on ?'
        inputProps={{
          maxLength: 1001,
        }}
        multiline
        fullWidth
        error={!!errors.title?.message}
        {...register('title', { maxLength: 1000 })}
      />
      <ValidationErrorMessage>
        {errors.title?.message as string}
      </ValidationErrorMessage>
    </>
  );
};
