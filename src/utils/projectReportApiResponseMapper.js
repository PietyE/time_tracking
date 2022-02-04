import {get as lodashGet} from 'lodash';
import { minutesToHoursPipe } from './minutesToHoursPipe'

const normalizeMinutes = (minutes) => {
  if(typeof minutes === 'number') {
    return minutes;
  }
  if(typeof minutes === 'string') {
    const value = parseInt(minutes);
    return isNaN(value) ? 0 : value;
  }
  return 0;
}

export const consolidateReportMapper = (response, currentCurrency) => {
  if (
    !response ||
    !response.data ||
    !Array.isArray(response.data) ||
    !response.data.length
  ) {
    return []
  }
  return response.data.reduce((previous, item) => {
    if (item && typeof item === 'object') {
      const reportItem = {
        name: lodashGet(item, 'name', ''),
        email: lodashGet(item, 'email', ''),
        developer_projects: lodashGet(item, 'developer_projects', ''),
        // rate_uah: lodashGet(item, 'rates[0].rate', ''),
        // rateCurrency: currentCurrency[lodashGet(item, 'rates[0].currency', '')] || '',
        // salary_uah: lodashGet(item, 'salaries[0].salary', 0),
        // salaryCurrency: currentCurrency[lodashGet(item, 'salaries[0].currency', '')] || '',
        id: lodashGet(item, 'id', ''),
        // total_expenses: lodashGet(item, 'expenses[0].amount', ''),
        // expensesId: lodashGet(item, 'expenses[0].id', ''),
        // total_overtimes: lodashGet(item, 'total_overtime_amount_uah', ''),
        // total: lodashGet(item, 'salary_uah', ''),
        // comments: lodashGet(item, 'comment.text', ''),
        // commentId: lodashGet(item, 'comment.id', ''),
        // total_uah: lodashGet(item, 'total_amount_uah', ''),
        // is_processed: lodashGet(item, 'is_processed', ''),
        totalHoursOvertime: minutesToHoursPipe(normalizeMinutes(lodashGet(item, 'overtime_minutes', ''))),
        // total_hours: minutesToHoursPipe(normalizeMinutes(lodashGet(item, 'total_minutes', ''))),
      }
      previous.push(reportItem)
      return previous
    }
    return previous
  }, [])
}


export const usersProjectReportMapper = (response) => {
  if (
    !response ||
    !response.data ||
    typeof response.data !== 'object' ||
    !Array.isArray(response.data.developer_projects) ||
    !response.data.developer_projects.length
  ) {
    return [];
  }


  return response.data.developer_projects.map(item => {
    return {
      name: lodashGet(item, 'project.name', ''),
      working_time: minutesToHoursPipe(normalizeMinutes(lodashGet(item, 'overtime_minutes', ''))),
      id: lodashGet(item, 'project.id', ''),
      total: lodashGet(item, 'total_overtime_amount_uah', ''),
      is_full_time: lodashGet(item, 'is_full_time', ''),
      idDeveloperProjects: lodashGet(item, 'id', ''),
      is_active: lodashGet(item, 'is_active', '')
    };
  });
}



