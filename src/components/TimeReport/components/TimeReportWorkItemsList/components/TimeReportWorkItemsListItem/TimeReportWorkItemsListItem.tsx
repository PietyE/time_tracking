import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm, type SubmitHandler, FormProvider } from 'react-hook-form';
import { TimeReportWorkItemsListItemButton } from './components/TimeReportWorkItemsListItemButton';
import { TimeReportWorkItemsListItemReport } from './components/TimeReportWorkItemsListItemReport';
import { TimeReportWorkItemsListItemTime } from './components/TimeReportWorkItemsListItemTime';
import { workItemValidationSchema } from 'shared/validationSchema';
import { createStyles } from './styles';

interface Fields {
  reportText: string;
  time: string | number;
}

export const TimeReportWorkItemsListItem: FC = (): JSX.Element => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(workItemValidationSchema),
    defaultValues: {
      reportText: '',
      time: '0:00',
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const isValidationError: boolean =
    !!errors.reportText?.message || !!errors.time?.message;

  const onSubmit: SubmitHandler<Fields> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <Grid
        container
        component='form'
        columnSpacing={24}
        bgcolor='common.white'
        alignItems='center'
        maxWidth={971}
        borderRadius={1.5}
        sx={createStyles(isValidationError).container}
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
