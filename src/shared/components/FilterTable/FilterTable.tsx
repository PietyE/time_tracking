import { type FC } from 'react';
import { Grid } from '@mui/material';
import { FilterTableHeader } from './components/FilterTableHeader';
import { FilterTableList } from './components/FilterTableList';
import { styles } from './styles';

const columns: number[] = [1, 2, 3];

export const FilterTable: FC = (): JSX.Element => (
  <Grid
    container
    flexDirection='column'
    maxWidth={1}
    justifyContent='flex-start'
    alignItems='flex-start'
    sx={styles.mainContainer}
  >
    <Grid item>
      <FilterTableHeader />
    </Grid>
    <Grid item>
      {columns.map((column) => (
        <FilterTableList
          key={column}
          column={column}
        />
      ))}
    </Grid>
  </Grid>
);
