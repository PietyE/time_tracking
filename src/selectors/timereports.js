import { createSelector } from 'reselect'

const getSelectedDate = state => state.timereports.selectedDate

const getTimeReportsSelector = state => state.timereports.reports

const getIsFetchingReport = state => state.timereports.isFetchingReports

const getTimeReports = createSelector(
  getTimeReportsSelector,
  reports => reports
)

export { getSelectedDate, getTimeReports, getIsFetchingReport }
