import { type FC, type PropsWithChildren } from 'react';
import { Grid } from '@mui/material';
import { FilterTableHeader } from './components/FilterTableHeader';
import { styles } from './styles';

export const FilterTable: FC<PropsWithChildren> = ({
  children,
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
    <Grid item>{children}</Grid>
  </Grid>
);
