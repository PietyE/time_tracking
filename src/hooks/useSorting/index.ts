import { useCallback, useState } from 'react';
import { orderBy } from 'lodash';
import { isTotalMinutes } from './helpers';
import { ASCEND, DESCEND } from 'constants/sortingOrder';

type SortingParam<F extends string> = Record<F, SortingOrder>;

interface ReturnType<F extends string, T> {
  sorting: T[];
  sortingParameter: SortingParam<F>;

  handleSortingChange: (data: T[]) => void;

  toggleSortingParameter: (sortKey: F) => void;
}

export const useSorting = <F extends string, T>(
  defaultSorting: SortingParam<F>,
): ReturnType<F, T> => {
  const [sorting, setSorting] = useState<T[]>([]);
  const [sortingParameter, setSortingParameters] =
    useState<SortingParam<F>>(defaultSorting);

  const toggleSortingParameter = (sortKey: F): void => {
    switch (sortingParameter[sortKey]) {
      case DESCEND:
        setSortingParameters({
          [sortKey]: ASCEND,
        } as SortingParam<F>);
        return;
      case ASCEND:
        setSortingParameters({
          [sortKey]: DESCEND,
        } as SortingParam<F>);
        return;
      default:
        isTotalMinutes(sortKey)
          ? setSortingParameters({
              [sortKey]: DESCEND,
            } as SortingParam<F>)
          : setSortingParameters({
              [sortKey]: ASCEND,
            } as SortingParam<F>);
    }
  };

  const handleSortingChange = useCallback(
    (data: T[]): void => {
      const keys = Object.keys(sortingParameter) as Array<
        keyof typeof sortingParameter
      >;
      const sortOrders = Object.values<SortingOrder>(sortingParameter);
      setSorting(() => orderBy(data, keys, sortOrders));
    },
    [sortingParameter],
  );

  return {
    sorting,
    sortingParameter,
    handleSortingChange,
    toggleSortingParameter,
  };
};
