import { useCallback, useState } from 'react';
import orderBy from 'lodash/orderBy';
import { ASCEND, DESCEND } from 'constants/sortingOrder';

interface SortingParamValues {
  order: SortingOrder;
  isAscByDefault: boolean;
}

type SortingParam<F extends string> = Record<F, SortingParamValues>;

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
    switch (sortingParameter[sortKey].order) {
      case DESCEND:
        setSortingParameters({
          [sortKey]: { ...sortingParameter[sortKey], order: ASCEND },
        } as SortingParam<F>);
        return;
      case ASCEND:
        setSortingParameters({
          [sortKey]: { ...sortingParameter[sortKey], order: DESCEND },
        } as SortingParam<F>);
        return;
      default:
        sortingParameter[sortKey].isAscByDefault
          ? setSortingParameters({
              [sortKey]: { ...sortingParameter[sortKey], order: ASCEND },
            } as SortingParam<F>)
          : setSortingParameters({
              [sortKey]: { ...sortingParameter[sortKey], order: DESCEND },
            } as SortingParam<F>);
    }
  };

  const handleSortingChange = useCallback(
    (data: T[]): void => {
      const keys = Object.keys(sortingParameter) as Array<
        keyof typeof sortingParameter
      >;
      const sortOrders = Object.values<SortingParamValues>(
        sortingParameter,
      ).map((sortParameter) => sortParameter.order);

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
