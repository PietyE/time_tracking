import { createSelector } from 'reselect'

const getSelectedDate = state => state.timereports.selectedDate

const getTimeReportsSelector = state => state.timereports.reports.items

const getIsFetchingReport = state => state.timereports.isFetchingReports

const getTimeReportForEdit = (state, id) =>
  state.timereports.reports.items.find(report => report.id === id)

const getTimeReports = createSelector(
  getTimeReportsSelector,
  reports => reports
)

export {
  getSelectedDate,
  getTimeReports,
  getIsFetchingReport,
  getTimeReportForEdit,
}
