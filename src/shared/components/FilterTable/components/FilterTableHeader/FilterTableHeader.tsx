import { type FC, memo } from 'react';
import { Grid } from '@mui/material';
import { FilterTableHeaderItem } from './components/FilterTableHeaderItem';
import { styles } from '../../styles';
import type { TableTitle } from '../../FilterTable';

interface Props {
  titles: TableTitle[];
  toggleSortingParameter: (sortKey: string) => void;
}

const FilterTableHeader: FC<Props> = ({
  titles,
  toggleSortingParameter,
}): JSX.Element => (
  <Grid
    container
    justifyContent='space-between'
    alignItems='center'
    sx={styles.header}
  >
    {titles.map((title) => (
      <FilterTableHeaderItem
        title={title}
        toggleSortingParameter={toggleSortingParameter}
        key={title.id}
      />
    ))}
  </Grid>
);

export const FilterTableHeaderMemoized = memo(FilterTableHeader);
