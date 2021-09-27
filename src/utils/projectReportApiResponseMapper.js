import {get as lodashGet} from 'lodash';


export const consolidateReportMapper = (response) => {
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
        rate_uah: lodashGet(item, 'rates[0].rate', ''),
        salary_uah: lodashGet(item, 'salary_uah', ''),
        id: lodashGet(item, 'id', ''),
        total_expenses: lodashGet(item, 'expenses[0].amount', ''),
        expensesId: lodashGet(item, 'expenses[0].id', ''),
        total_overtimes: lodashGet(item, 'total_overtime_amount_uah', ''),
        total: lodashGet(item, 'total', ''),
        comments: lodashGet(item, 'comment.text', ''),
        commentId: lodashGet(item, 'comment.id', ''),
        total_uah: lodashGet(item, 'total_amount_uah', ''),
        is_processed: lodashGet(item, 'is_processed', '')
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


  return  response.data.developer_projects.map(item => {
      return {
        name: lodashGet(item, 'project.name', ''),
        working_time: '',
        id: lodashGet(item, 'project.id', ''),
        total: lodashGet(item, 'total', ''),
        is_full_time: lodashGet(item, 'is_full_time', '')
      };

  });
}



