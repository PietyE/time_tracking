import { useCallback, useState } from 'react';
import { orderBy } from 'lodash';
import { ASCEND, DESCEND } from 'constants/sortingOrder';
import type { ProjectsWithTotalMinutes } from 'api/models/projects';

type Fields = 'name' | 'total_minutes';

type SortingParam = Record<Fields, SortingOrder>;

interface ReturnType {
  sorting: ProjectsWithTotalMinutes;
  sortingParameter: SortingParam;

  handleSortingChange: (data: ProjectsWithTotalMinutes) => void;

  toggleSortingParameter: (sortKey: Fields) => void;
}

export const useSorting = (defaultSorting: SortingParam): ReturnType => {
  const [sorting, setSorting] = useState<ProjectsWithTotalMinutes>([]);
  const [sortingParameter, setSortingParameters] =
    useState<SortingParam>(defaultSorting);

  const toggleSortingParameter = (sortKey: Fields): void => {
    switch (sortingParameter[sortKey]) {
      case DESCEND:
        setSortingParameters({ [sortKey]: ASCEND } as SortingParam);
        return;
      case ASCEND:
        setSortingParameters({ [sortKey]: DESCEND } as SortingParam);
    }
  };

  const handleSortingChange = useCallback(
    (data: ProjectsWithTotalMinutes): void => {
      const keys = Object.keys(sortingParameter) as Array<
        keyof typeof sortingParameter
      >;

      const sortOrders = Object.values(sortingParameter);

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
