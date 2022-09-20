import { createSelector } from 'reselect'

export const selectUserProjects = (state) => state.projectReportDetails
// export const selectUserProjectsComments = state => state.projectReportDetails.comments;
export const selectProjectsReport = (state) => state.projectsReport

export const selectProjectReportByUserId = createSelector(
  [selectUserProjects, (state, userId) => userId],
  (reportDetails, userId) => {
    try {
      if (reportDetails) {
        return reportDetails[userId]
      }
    } catch (e) {}
    return null
  }
)

export const selectProjectReportReportRefactored = createSelector(
  [selectProjectsReport],
  (projectsReport) => {
    try {
      //    debugger
      if (projectsReport) {
        return projectsReport.reportsRefactored
      }
    } catch (e) {}
    return null
  }
)

export const selectReportRefactoredByUserId = createSelector(
  [selectProjectReportReportRefactored, (state, userId) => userId],
  (reportsRefactored, userId) => {
    try {
      if (reportsRefactored) {
        const report = reportsRefactored.filter((item) => {
          return item.id === userId
        })
        if (report.length) {
          return report[0]
        }
      }
    } catch (e) {}
    return null
  }
)

export const selectCommentsByUserId = createSelector(
  [selectReportRefactoredByUserId],
  (report) => {
    try {
      if (report && report.comments) {
        return [report.comments]
      }
    } catch (e) {}
    return []
  }
)

export const selectProjectsByUserId = createSelector(
  [selectProjectReportByUserId],
  (projectReportByUser) => {
    try {
      if (projectReportByUser) {
        return projectReportByUser.projects
      }
    } catch (e) {}
    return []
  }
)

export const selectProjectsReportHistory = createSelector(
  [selectProjectsReport],
  (projectReport) => {
    try {
      if (projectReport) {
        return projectReport.reportHistory
      }
    } catch (e) {}
    return []
  }
)

export const selectProjectsReportHistoryLast = createSelector(
  [selectProjectsReportHistory],
  (projectReportHistory) => {
    try {
      if (projectReportHistory && projectReportHistory.lenght) {
        return projectReportHistory[projectReportHistory.lenght - 1]
      }
    } catch (e) {}
    return null
  }
)
