import type { FC } from 'react';
import { Grid } from '@mui/material';
import { FilterTableHeaderItem } from './components/FilterTableHeaderItem';
import { styles } from '../../styles';

export const FilterTableHeader: FC = (): JSX.Element => (
  <Grid
    container
    justifyContent='space-between'
    alignItems='center'
    sx={styles.header}
  >
    <FilterTableHeaderItem title='Project name' />
    <FilterTableHeaderItem title='Hours worked' />
  </Grid>
);
