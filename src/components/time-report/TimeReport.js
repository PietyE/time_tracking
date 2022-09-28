import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  addTimeReport,
  clearSelectedProject,
  getTimeReportCsv,
  resetSelectedDate,
  selectProject,
  setUserStatus,
} from 'actions/times-report'
import { selectDevelopers } from 'actions/developers'
import {
  getAllDays,
  getDeveloperProjectsTR,
  getIsFetchingReport,
  getSelecredDeveloper,
  getSelectDayStatus,
  getSelectedDay,
  getSelectedDayStatus,
  getSelectedProject,
  getTimeReports,
} from 'selectors/timereports'
import { getProfileId, getRoleUser } from 'selectors/user'
import { getProjectsSelector } from 'selectors/developer-projects'
import { getDevelopersSelector } from 'selectors/developers'
import { DEVELOPER } from 'constants/role-constant'
import './style.scss'
import { DANGER_ALERT } from 'constants/alert-constant'
import { showAlert } from 'actions/alert'
import TimeReportDesktop from './TimeReportDesktop'
import useBreakpoints from 'custom-hook/useBreakpoints'
import TimeReportMobile from './TimeReportMobile'
import { findListItemById } from 'utils/common'
import { QUERY_PARAMETERS } from 'constants/timereports-constant'
import { useSearchParams } from 'custom-hook/useSearchParams'
import { validateDate } from 'utils/date'
import { getSelectedDate } from 'selectors/calendar'
import { changeSelectedDate } from 'actions/calendar'

function TimeReport(props) {
  const {
    changeSelectedDate,
    addTimeReport,
    selectProject,
    clearSelectedProject,
    selectedDate = {},
    reports,
    isFetchingReports,
    roleUser,
    projects = [],
    selectedProject = {},
    developersList = [],
    selectedDeveloper,
    selectDevelopers,
    selectedDeveloperProjectsTR,
    getTimeReportCsv,
    selectDayStatus,
    selectedDayStatus,
    showAlert,
    profileId,
  } = props

  // eslint-disable-next-line no-unused-vars
  const [showEmpty] = useState(true)
  const todayDate = new Date()
  const { isMobile, isTablet } = useBreakpoints()
  const history = useHistory()

  const queryParams = useSearchParams()

  const queryProjectId = queryParams.get(QUERY_PARAMETERS.projectId)
  const queryYear = queryParams.get(QUERY_PARAMETERS.year)
  const queryMonth = queryParams.get(QUERY_PARAMETERS.month)
  const queryDeveloperId = queryParams.get(QUERY_PARAMETERS.developerId)

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  let daySize = getDaysInMonth(new Date(selectedDate.year, selectedDate.month))

  if (
    selectedDate.year === todayDate.getFullYear() &&
    selectedDate.month === todayDate.getMonth()
  ) {
    daySize = todayDate.getDate()
  }

  const renderDaysArray = []

  for (let i = 0; i < daySize; i++) {
    renderDaysArray.push(i)
  }

  const totalHours = selectedDeveloperProjectsTR
    ? selectedDeveloperProjectsTR.reduce((res, item) => {
        return res + item.total_minutes
      }, 0)
    : 0

  const selectedProjectHours =
    reports && selectedProject
      ? reports.reduce((res, item) => res + item.duration, 0)
      : 0

  const updateTimereportState = useCallback(() => {
    const { year: selectedYear, month: selectedMonth } = selectedDate
    const isSelectedProjectExist =
      !!selectedProject && !!Object.entries(selectedProject).length
    const isSelectedDateExist =
      !!selectedDate && !!Object.entries(selectedDate).length
    const isSelectedDeveloperExist =
      !!selectedDeveloper && !!Object.entries(selectedDeveloper).length

    if (isSelectedProjectExist && queryProjectId !== selectedProject.id) {
      queryParams.set(QUERY_PARAMETERS.projectId, selectedProject?.id)
    }

    if (
      isSelectedDateExist &&
      (selectedYear !== queryYear || selectedMonth !== queryMonth)
    ) {
      queryParams.set(QUERY_PARAMETERS.year, selectedDate.year)
      queryParams.set(QUERY_PARAMETERS.month, selectedDate.month)
    }

    if (
      isSelectedDeveloperExist &&
      selectedDeveloper.id !== queryDeveloperId &&
      developersList.length
    ) {
      queryParams.set(QUERY_PARAMETERS.developerId, selectedDeveloper.id)
    }

    const url = queryParams.toString()
    history.push({
      search: `${url}`,
    })
  }, [selectedProject, selectedDate, selectedDeveloper])

  const handlerExportCsv = () => {
    if (!reports || reports?.length === 0) {
      showAlert({
        type: DANGER_ALERT,
        title: 'Error while exporting to XLSX',
        message:
          'You can not export time report in XLSX because there are no filled working hours',
        delay: 5000,
      })
      return
    }
    getTimeReportCsv()
  }

  const setInitialTimereportValuesFromUrl = useCallback(() => {
    if (projects.length) {
      const project = findListItemById(projects, queryProjectId)
      selectProject(project || projects[0])

      const month = Number(queryMonth)
      const year = Number(queryYear)
      const isDateValid = validateDate(month, year)

      changeSelectedDate(
        isDateValid
          ? {
              year,
              month,
            }
          : {
              year: todayDate.getFullYear(),
              month: todayDate.getMonth(),
            }
      )
    }
  }, [projects])

  const setInitialDeveloperValueFromUrl = useCallback(() => {
    if (developersList.length && roleUser !== DEVELOPER) {
      const developer = findListItemById(developersList, queryDeveloperId)

      // FIX: This if clause is a big 'kostyl', because developersList updates on each call of selectDeveloper function
      if (
        developer &&
        selectedDeveloper.id !== developer.id &&
        selectedDeveloper.id === profileId
      ) {
        selectDevelopers({
          id: developer.id,
          name: developer.name,
          email: developer.email,
        })
      }
    }

    if (roleUser === DEVELOPER) {
      queryParams.delete(QUERY_PARAMETERS.developerId)
    }
  }, [developersList])

  useEffect(() => {
    updateTimereportState()
  }, [updateTimereportState])

  useEffect(() => {
    setInitialTimereportValuesFromUrl()
  }, [setInitialTimereportValuesFromUrl])

  useEffect(() => {
    setInitialDeveloperValueFromUrl()
  }, [setInitialDeveloperValueFromUrl])

  useEffect(() => {
    return () => {
      clearSelectedProject()
    }
  }, [])

  if (isMobile && !isTablet) {
    return (
      <TimeReportMobile
        isFetchingReports={isFetchingReports}
        totalHours={totalHours}
        roleUser={roleUser}
        developersList={developersList}
        selectedDeveloper={selectedDeveloper}
        projects={projects}
        clearSelectedProject={clearSelectedProject}
        selectProject={selectProject}
        selectedProject={selectedProject}
        selectedDate={selectedDate}
        changeSelectedDateTimeReport={changeSelectedDate}
        handlerExportCsv={handlerExportCsv}
        selectedProjectHours={selectedProjectHours}
        reports={reports}
        renderDaysArray={renderDaysArray}
        daySize={daySize}
        todayDate={todayDate}
        addTimeReport={addTimeReport}
        showEmpty={showEmpty}
        selectDayStatus={selectDayStatus}
        selectedDayStatus={selectedDayStatus}
        setUserStatus={setUserStatus}
        selectDevelopers={selectDevelopers}
      />
    )
  }

  return (
    <TimeReportDesktop
      isFetchingReports={isFetchingReports}
      totalHours={totalHours}
      roleUser={roleUser}
      developersList={developersList}
      selectedDeveloper={selectedDeveloper}
      projects={projects}
      clearSelectedProject={clearSelectedProject}
      selectProject={selectProject}
      selectedProject={selectedProject}
      selectedDate={selectedDate}
      changeSelectedDateTimeReport={changeSelectedDate}
      handlerExportCsv={handlerExportCsv}
      selectedProjectHours={selectedProjectHours}
      reports={reports}
      renderDaysArray={renderDaysArray}
      daySize={daySize}
      todayDate={todayDate}
      addTimeReport={addTimeReport}
      showEmpty={showEmpty}
      selectDayStatus={selectDayStatus}
      selectedDayStatus={selectedDayStatus}
      setUserStatus={setUserStatus}
    />
  )
}

const mapStateToProps = (state) => ({
  selectedDate: getSelectedDate(state),
  reports: getTimeReports(state),
  isFetchingReports: getIsFetchingReport(state),
  roleUser: getRoleUser(state),
  projects: getProjectsSelector(state),
  selectedProject: getSelectedProject(state),
  developersList: getDevelopersSelector(state),
  selectedDeveloper: getSelecredDeveloper(state),
  selectedDeveloperProjectsTR: getDeveloperProjectsTR(state),
  selectedDays: getAllDays(state),
  selectedDay: getSelectedDay(state),
  selectDayStatus: getSelectDayStatus(state),
  selectedDayStatus: getSelectedDayStatus(state),
  profileId: getProfileId(state),
})

const actions = {
  changeSelectedDate,
  addTimeReport,
  selectProject,
  clearSelectedProject,
  resetSelectedDate,
  selectDevelopers,
  getTimeReportCsv,
  setUserStatus,
  getDeveloperProjectsTR,
  showAlert,
}

export default connect(mapStateToProps, actions)(memo(TimeReport))
