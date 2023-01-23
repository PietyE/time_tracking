import { type FC } from 'react';
import { IconButton, Grid, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { TimeInput } from 'shared/components/TimeInput';
import { styles } from './styles';

interface Fields {
  reportText: string;
  time: string | number;
}

export const TimeReportWorkItemsListItem: FC = (): JSX.Element => {
  const { register, control, handleSubmit } = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = (data) => console.log(data);

  return (
    <Grid
      container
      component='form'
      columnSpacing={24}
      bgcolor='common.white'
      alignItems='center'
      maxWidth={971}
      borderRadius={1.5}
      sx={styles.container}
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
      >
        <TextField
          multiline
          fullWidth
          {...register('reportText')}
        />
      </Grid>
      <Grid
        item
        xs={1.1}
      >
        <Controller
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TimeInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              mask='9:99'
              placeholder='0:00'
              maskChar='0'
              error={false}
            />
          )}
          control={control}
          name='time'
        />
      </Grid>
      <Grid
        item
        xs={0.9}
      >
        <IconButton
          type='submit'
          sx={styles.button}
        >
          <CheckIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
