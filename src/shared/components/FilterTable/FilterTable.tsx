import { type FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import get from 'lodash/get';
import { FilterTableContentItem } from './components/FilterTableContent/components/FilterTableContentItem';
import { FilterTableHeaderMemoized } from './components/FilterTableHeader';
import { useTableSorting } from './helpers';
import { useSorting } from 'hooks/useSorting';
import { styles } from './styles';

export interface TableTitle {
  title: string;
  shouldSort: boolean;
  size: number;
  id: string;
  sortingParamName: string;
  sortParamOrder: 'asc' | 'desc';
}

interface BaseProps {
  rows: object[];

  keyToName: string[];
  keyToMail: string[];

  keyToTime: string[];
  keyToId: string[];

  titles: TableTitle[];
}

type DropDownTable = BaseProps & {
  isHaveDropDown: true;
  keyToDropDownValues: string[];
  keyToDropDownValueId: string[];
  keyToDropDownValueName: string[];
  keyToDropDownValueTime: string[];
};

type BaseTable = BaseProps & {
  isHaveDropDown: false;
  keyToDropDownValues?: never;
  keyToDropDownValueId?: never;
  keyToDropDownValueName?: never;
  keyToDropDownValueTime?: never;
};

type Props = DropDownTable | BaseTable;

// TODO: Check memo

export const FilterTable: FC<Props> = ({
  rows,
  titles,
  keyToId,
  keyToName,
  keyToMail,
  keyToTime,
  keyToDropDownValues = [],
  keyToDropDownValueId = [],
  keyToDropDownValueName = [],
  keyToDropDownValueTime = [],
  isHaveDropDown,
}): JSX.Element => {
  const { sortingKeys, sortingObject } = useTableSorting(titles);
  const {
    sorting,
    sortingParameter,
    toggleSortingParameter,
    handleSortingChange,
  } = useSorting<UnpackedArray<typeof sortingKeys>, UnpackedArray<typeof rows>>(
    sortingObject,
  );

  useEffect(() => {
    handleSortingChange(rows);
  }, [sortingParameter, handleSortingChange, rows]);

  return (
    <Grid
      container
      flexDirection='column'
      maxWidth={1}
      justifyContent='flex-start'
      alignItems='flex-start'
      sx={styles.mainContainer}
    >
      <Grid item>
        <FilterTableHeaderMemoized
          titles={titles}
          toggleSortingParameter={toggleSortingParameter}
        />
      </Grid>
      {!!sorting?.length &&
        sorting.map((row) => (
          <FilterTableContentItem
            key={get(row, keyToId)}
            row={row}
            isHaveDropDown={isHaveDropDown}
            keyToId={keyToId}
            keyToName={keyToName}
            keyToTime={keyToTime}
            keyToMail={keyToMail}
            keyToDropDownValueId={keyToDropDownValueId}
            keyToDropDownValueName={keyToDropDownValueName}
            keyToDropDownValues={keyToDropDownValues}
            keyToDropDownValueTime={keyToDropDownValueTime}
          />
        ))}
    </Grid>
  );
};
