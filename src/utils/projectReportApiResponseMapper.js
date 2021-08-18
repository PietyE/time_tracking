export const consolidateReportMapper = (response) => {
  let data = {}
  if (response && typeof response === 'object') {
    data = response
  }
  const consolidateReportArray = data.data
  // console.dir(consolidateReportArray);
  if (!consolidateReportArray || !Array.isArray(consolidateReportArray) || !consolidateReportArray.length) {
    return []
  }
  return consolidateReportArray.reduce((previous, item) => {
    if (item && typeof item === 'object') {
      const reportItem = {
        name: item.name,
        developer_projects: '',
        rate_uah: item.rates,
        salary_uah: item.salary_uah,
        id: item.id,
        total_expenses: item.expenses,
        total_overtimes: item.total_overtime_amount_uah,
        total: '',
        comments: item.comments,
        total_uah: item.total_amount_uah,
        is_processed: item.is_processed
      }
      previous.push(reportItem)
      return previous
    }
    return previous
  }, [])
}