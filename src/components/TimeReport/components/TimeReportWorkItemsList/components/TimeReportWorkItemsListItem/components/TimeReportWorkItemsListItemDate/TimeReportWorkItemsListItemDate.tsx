import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Vacation } from 'shared/components/svg/Vacation';

interface Props {
  isWeekend: boolean;
  dayTitle: string;
}

export const TimeReportWorkItemsListItemDate: FC<Props> = ({
  dayTitle,
  isWeekend,
}): JSX.Element => (
  <Box
    display='flex'
    alignItems='center'
  >
    <Typography
      variant='subtitle1'
      color={isWeekend ? 'error' : 'inherit'}
    >
      {dayTitle}
    </Typography>
    {isWeekend && (
      <Box
        fontSize={24}
        ml={10}
        display='inline-block'
      >
        <Vacation />
      </Box>
    )}
  </Box>
);
