import { createSelector } from 'reselect'

const getSelectedDateTimeReport = (state) => state.timereports.selectedDate

const getTimeReportsSelector = (state) => state.timereports.reports?.items

const getIsFetchingReport = (state) => state.timereports.isFetchingReports

const getTimeReportForEdit = (state, id) =>
  state.timereports.reports.items.find((report) => report.id === id)

const getSelectedProject = (state) => state.timereports.selectedProject

const getSelecredDeveloper = (state) => state.timereports.selectedDeveloper

const getDeveloperProjectsTR = (state) =>
  state.timereports.selectedDeveloperProjectsTR

const getTimeReports = createSelector(getTimeReportsSelector, (reports) =>
  reports ? reports.filter((report) => report.is_active) : reports
)

const getAllDays = (state) => state.timereports.selectDays

const getSelectedDay = (state) => state.timereports.selctedDay

const getSelectDayStatus = (state) => state.timereports.selectDayStatus

const getSelectedDayStatus = (state) => state.timereports.selectedDayStatus

const getIdEditingWorkItem = (state) => state.timereports.idEditingWorkItem

export {
  getSelectedDateTimeReport,
  getTimeReports,
  getIsFetchingReport,
  getTimeReportForEdit,
  getSelectedProject,
  getSelecredDeveloper,
  getIdEditingWorkItem,
  getAllDays,
  getSelectedDay,
  getSelectDayStatus,
  getSelectedDayStatus,
  getDeveloperProjectsTR,
}
