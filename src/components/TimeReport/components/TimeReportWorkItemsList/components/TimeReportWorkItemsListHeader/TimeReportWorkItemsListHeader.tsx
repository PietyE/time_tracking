import type { FC, PropsWithChildren } from 'react';
import { Grid, Typography, type TypographyProps } from '@mui/material';

export const TimeReportWorkItemsListHeader: FC = (): JSX.Element => (
  <Grid
    container
    alignItems='center'
    justifyContent='space-between'
  >
    <TimeReportWorkItemsListHeaderItem xs={4}>
      date
    </TimeReportWorkItemsListHeaderItem>
    <TimeReportWorkItemsListHeaderItem xs={6}>
      tasks
    </TimeReportWorkItemsListHeaderItem>
    <TimeReportWorkItemsListHeaderItem xs={2}>
      hours
    </TimeReportWorkItemsListHeaderItem>
  </Grid>
);
const TimeReportWorkItemsListHeaderItem: FC<
  PropsWithChildren<TypographyProps> & { xs: number }
> = ({ children, xs, ...props }): JSX.Element => (
  <Grid
    item
    xs={xs}
  >
    <Typography
      textTransform='uppercase'
      variant='subtitle2'
      fontWeight='fontWeightBold'
      color='customGrey.MAIN_TEXT'
      {...props}
    >
      {children}
    </Typography>
  </Grid>
);
