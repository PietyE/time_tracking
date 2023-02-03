import type { FC, PropsWithChildren } from 'react';
import { Grid, Typography, type TypographyProps } from '@mui/material';

interface ItemProps {
  xs: number;
  title: string;
  hoursWorked?: string;
}
const TimeReportWorkItemsListHeaderItem: FC<
  PropsWithChildren<TypographyProps & ItemProps>
> = ({ children, xs, title, hoursWorked, ...props }): JSX.Element => (
  <Grid
    item
    xs={xs}
    display={hoursWorked ? 'flex' : 'block'}
  >
    <Typography
      textTransform='uppercase'
      variant='subtitle2'
      fontWeight='fontWeightBold'
      color='customGrey.MAIN_TEXT'
      mr={hoursWorked ? 6 : 0}
      {...props}
    >
      {title}
    </Typography>
    {hoursWorked && (
      <Typography
        textTransform='uppercase'
        variant='subtitle2'
        fontWeight='fontWeightBold'
      >
        | {hoursWorked}
      </Typography>
    )}
  </Grid>
);

interface Props {
  hoursWorked: string;
}

export const TimeReportWorkItemsListHeader: FC<Props> = ({
  hoursWorked,
}): JSX.Element => (
  <Grid
    container
    alignItems='center'
    justifyContent='space-between'
    mb={24}
    px={30}
  >
    <TimeReportWorkItemsListHeaderItem
      title='date'
      xs={2.5}
    />
    <TimeReportWorkItemsListHeaderItem
      title='tasks'
      xs={6}
    />
    <TimeReportWorkItemsListHeaderItem
      title='hours'
      xs={2}
      hoursWorked={hoursWorked}
    />
  </Grid>
);
