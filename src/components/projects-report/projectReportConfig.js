export const initialColumns = [
  { name: 'name', title: 'Name' },
  { name: 'developer_projects', title: 'Projects' },
  { name: 'totalHours', title: 'Hours' },
];

export const columnExtensions = [
  { columnName: 'name', width: '25%', align: 'left', wordWrapEnabled: true },
  { columnName: 'developer_projects', width: 'auto', align: 'left', wordWrapEnabled: true },
  { columnName: 'totalHours', width: '20%', align: 'center', wordWrapEnabled: false },
];