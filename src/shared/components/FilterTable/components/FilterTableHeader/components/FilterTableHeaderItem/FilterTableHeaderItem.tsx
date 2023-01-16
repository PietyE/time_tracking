import { type FC } from 'react';
import { ArrowDropUp } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';

interface Props {
  title: string;
}

export const FilterTableHeaderItem: FC<Props> = ({ title }): JSX.Element => (
  <Grid item>
    <Grid
      container
      justifyContent='flex-start'
      alignItems='center'
    >
      <Typography
        variant='subtitle2'
        color='black.300'
        fontWeight='fontWeightBold'
      >
        {title}
      </Typography>
      <Stack>
        <ArrowDropUp />
        <ArrowDropUp />
      </Stack>
    </Grid>
  </Grid>
);
