import { createSelector } from 'reselect'

const getSelectedDateTimeReport = state => state.timereports.selectedDate

const getTimeReportsSelector = state => state.timereports.reports.items

const getIsFetchingReport = state => state.timereports.isFetchingReports

const getTimeReportForEdit = (state, id) =>
  state.timereports.reports.items.find(report => report.id === id)

const getSelectedProject = state => state.timereports.selectedProject

const getSelecredDeveloper = state => state.timereports.selectedDeveloper

const getTimeReports = createSelector(
  getTimeReportsSelector,
  reports => reports
)

export {
  getSelectedDateTimeReport,
  getTimeReports,
  getIsFetchingReport,
  getTimeReportForEdit,
  getSelectedProject,
  getSelecredDeveloper,
}
