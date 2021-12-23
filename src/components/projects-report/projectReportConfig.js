import { DEVELOPER, PM } from '../../constants/role-constant'

export const roleRestrictions = {
  [DEVELOPER]: ['comments', 'is_processed',],
  [PM]: ['salary_uah', 'rate_uah', 'total_overtimes', 'total', 'total_expenses', 'total_uah', 'is_processed',],
}
export const initialColumns = [
  { name: 'name', title: 'Name' },
  { name: 'developer_projects', title: 'Projects'},
  { name: 'salary_uah', title: 'Salary' },
  { name: 'rate_uah', title: 'Rate' },
  { name: 'totalHoursOvertime', title: 'Hours' },
  { name: 'total_overtimes', title: 'Overtime\n salary,\n total' },
  { name: 'total', title: 'Total salary' },
  { name: 'total_expenses', title: 'Extra costs, UAH' },
  { name: 'total_uah', title: 'Total to pay, UAH' },
  { name: 'comments', title: 'Comments' },
  { name: 'is_processed', title: 'Payed' },
];

export const columnExtensions = [
  { columnName: 'name', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'developer_projects', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'salary_uah', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'rate_uah', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'totalHoursOvertime', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'total_overtimes', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'total', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'total_expenses', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'total_uah', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'comments', width: 'auto', align: 'center', wordWrapEnabled: false},
  { columnName: 'is_processed', width: 'auto', align: 'center', wordWrapEnabled: false},
];
