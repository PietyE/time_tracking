import { type FC, type PropsWithChildren } from 'react';
import { Grid } from '@mui/material';
import { FilterTableHeader } from './components/FilterTableHeader';
import { styles } from './styles';

interface Props {
  rows: any[];
}

export const FilterTable: FC<PropsWithChildren<Props>> = ({
  children,
  rows,
}): JSX.Element => (
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
    {rows.map((row) => (
      <Grid
        item
        key={row}
      >
        {children}
      </Grid>
    ))}
  </Grid>
);
