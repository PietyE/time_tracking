import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, Grid, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { TimeInput } from 'shared/components/TimeInput';
import { workItemValidationSchema } from 'shared/validationSchema';
import { ValidationErrorMessage } from 'shared/components/ValidationErrorMessage';
import { createStyles } from './styles';

interface Fields {
  reportText: string;
  time: string | number;
}

export const TimeReportWorkItemsListItem: FC = (): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Fields>({
    mode: 'onChange',
    resolver: yupResolver(workItemValidationSchema),
    defaultValues: {
      reportText: '',
      time: '0:00',
    },
  });

  const onSubmit: SubmitHandler<Fields> = (data) => console.log(data);

  const validationError: boolean =
    !!errors.reportText?.message || !!errors.time?.message;

  return (
    <Grid
      container
      component='form'
      columnSpacing={24}
      bgcolor='common.white'
      alignItems='center'
      maxWidth={971}
      borderRadius={1.5}
      sx={createStyles(validationError).container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        item
        xs={3}
        p={0}
      >
        <Typography variant='subtitle1'>Monday, 29</Typography>
      </Grid>
      <Grid
        item
        xs={7}
        position='relative'
      >
        <TextField
          maxLength={100}
          maxRows='8'
          inputProps={{
            maxLength: 1001,
          }}
          multiline
          fullWidth
          error={!!errors.reportText?.message}
          {...register('reportText', { maxLength: 1000 })}
        />
        <ValidationErrorMessage>
          {errors.reportText?.message}
        </ValidationErrorMessage>
      </Grid>
      <Grid
        item
        xs={1.1}
        position='relative'
      >
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
        <ValidationErrorMessage>{errors.time?.message}</ValidationErrorMessage>
      </Grid>
      <Grid
        item
        xs={0.9}
      >
        <IconButton
          type='submit'
          sx={createStyles(!isDirty || validationError).button}
        >
          <CheckIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
