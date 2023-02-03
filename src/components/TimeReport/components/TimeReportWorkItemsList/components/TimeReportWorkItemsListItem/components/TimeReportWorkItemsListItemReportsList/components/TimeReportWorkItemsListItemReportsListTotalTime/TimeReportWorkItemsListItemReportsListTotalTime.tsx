import { type FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';

interface Props {
  currentDayTotalTime: number;
}

export const TimeReportWorkItemsListItemReportsListTotalTime: FC<Props> = ({
  currentDayTotalTime,
}): JSX.Element => (
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
      <Typography variant='subtitle1'>
        {parseMinToHoursAndMin(currentDayTotalTime)}
      </Typography>
    </Grid>
  </Grid>
);
