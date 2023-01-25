import { type FC, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography, Box, Divider } from '@mui/material';
import { useForm, type SubmitHandler, FormProvider } from 'react-hook-form';
import { TimeReportWorkItemsListItemButton } from './components/TimeReportWorkItemsListItemButton';
import { TimeReportWorkItemsListItemReport } from './components/TimeReportWorkItemsListItemReport';
import { TimeReportWorkItemsListItemReportsList } from './components/TimeReportWorkItemsListItemReportsList';
import { TimeReportWorkItemsListItemTime } from './components/TimeReportWorkItemsListItemTime';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { getWorkItems as getWorkItemsSelector } from 'redux/selectors/timereports';
import { getWorkItems } from 'redux/asyncActions/timereports';
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

  const workItems = useAppShallowSelector(getWorkItemsSelector);
  const dispatch = useAppDispatch();

  console.log(workItems);

  useEffect(() => {
    void dispatch(
      getWorkItems({
        developer_project: '5af98ca0-8863-4e9a-b6d4-7c12d887b7a2',
        year: 2023,
        month: 1,
      }),
    );
  }, []);

  return (
    <Box
      sx={createStyles(isValidationError).wrapper}
      bgcolor='common.white'
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
      <Divider />
      <TimeReportWorkItemsListItemReportsList />
    </Box>
  );
};
