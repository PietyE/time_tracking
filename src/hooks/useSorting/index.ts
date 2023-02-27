import { useCallback, useState } from 'react';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { ASCEND, DESCEND } from 'constants/sortingOrder';

export interface SortingParamValues {
  order: SortingOrder;
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

  const toggleSortingParameter = useCallback(
    (sortKey: F) => {
      switch (sortingParameter[sortKey]?.order) {
        case DESCEND:
          setSortingParameters({
            [sortKey]: { ...sortingParameter[sortKey], order: ASCEND },
          } as SortingParam<F>);
          break;
        case ASCEND:
          setSortingParameters({
            [sortKey]: {
              ...sortingParameter[sortKey],
              order: DESCEND,
            },
          } as SortingParam<F>);
          break;
        default:
          setSortingParameters({
            ...sortingParameter,
            [sortKey]: {
              order: ASCEND,
            },
          });
      }
    },
    [sortingParameter],
  );

  const handleSortingChange = useCallback(
    (data: T[]): void => {
      const keys = Object.keys(sortingParameter) as Array<
        keyof typeof sortingParameter
      >;
      const sortOrders = Object.values<SortingParamValues>(
        sortingParameter,
      ).map((sortParameter) => sortParameter.order);

      const customSorter = keys.map((key) =>
        key === 'name'
          ? (element: UnpackedArray<typeof data>) =>
              (get(element, key) as string).toLowerCase()
          : (element: UnpackedArray<typeof data>) =>
              get(element, key) ? get(element, key) : 0,
      );

      setSorting(() => orderBy(data, customSorter, sortOrders));
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
