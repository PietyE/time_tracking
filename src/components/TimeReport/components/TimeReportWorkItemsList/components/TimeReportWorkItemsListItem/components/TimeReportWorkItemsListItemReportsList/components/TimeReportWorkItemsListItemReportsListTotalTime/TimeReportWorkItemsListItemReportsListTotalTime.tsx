import { type FC } from 'react';
import { Grid, Typography } from '@mui/material';

export const TimeReportWorkItemsListItemReportsListTotalTime: FC =
  (): JSX.Element => (
    <Grid
      container
      alignItems='center'
      justifyContent='flex-end'
      py={16}
      px={30}
    >
      <Grid
        item
        mr={85}
      >
        <Typography variant='subtitle1'>1:00</Typography>
      </Grid>
    </Grid>
  );
