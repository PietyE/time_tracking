import type { TableTitle } from 'shared/components/FilterTable/FilterTable';

export const titles: TableTitle[] = [
  {
    title: 'Name',
    shouldSort: true,
    size: 3.5,
    id: '1',
    sortingParamName: 'name',
    sortParamOrder: 'asc',
  },
  {
    title: 'Project',
    shouldSort: false,
    size: 6,
    id: '2',
    sortingParamName: 'developer_projects.name',
    sortParamOrder: 'asc',
  },
  {
    title: 'Hours worked',
    shouldSort: false,
    size: 2.5,
    id: '3',
    sortingParamName: 'total_minutes',
    sortParamOrder: 'asc',
  },
];
