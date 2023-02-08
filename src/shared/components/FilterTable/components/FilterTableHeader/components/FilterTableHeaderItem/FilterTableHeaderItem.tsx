import { type FC } from 'react';
import { ArrowDropUp } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
import type { TableTitle } from '../../../../FilterTable';

interface Props {
  title: TableTitle;
}

export const FilterTableHeaderItem: FC<Props> = ({ title }): JSX.Element => (
  <Grid
    item
    xs={title.size}
  >
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
        {title.title}
      </Typography>
      {title.shouldSort && (
        <Stack>
          <ArrowDropUp />
          <ArrowDropUp />
        </Stack>
      )}
    </Grid>
  </Grid>
);
