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
        developer_projects: lodashGet(item, 'developer_projects', ''),
        rate_uah: lodashGet(item, 'rates[0].rate', ''),
        salary_uah: lodashGet(item, 'salary_uah', ''),
        id: lodashGet(item, 'id', ''),
        total_expenses: lodashGet(item, 'expenses[0].amount_uah', ''),
        total_overtimes: lodashGet(item, 'total_overtime_amount_uah', ''),
        total: lodashGet(item, 'total', ''),
        comments: lodashGet(item, 'comments', ''),
        total_uah: lodashGet(item, 'total_amount_uah', ''),
        is_processed: lodashGet(item, 'is_processed', '')
      }
      previous.push(reportItem)
      return previous
    }
    return previous
  }, [])
}