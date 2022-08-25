import React, { memo, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { isEmpty } from 'lodash'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import {
  addTimeReport,
  changeSelectedDateTimeReport,
  clearSelectedProject,
  getTimeReportCsv,
  resetSelectedDate,
  selectProject,
  setUserStatus,
} from 'actions/times-report'
import { selectDevelopers } from 'actions/developers'
import { getDeveloperProjectsById } from 'actions/projects-management'
import {
  getAllDays,
  getDeveloperProjectsTR,
  getIsFetchingReport,
  getSelecredDeveloper,
  getSelectDayStatus,
  getSelectedDateTimeReport,
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

// import FunnelSelect from "./components/FunnelSelect";

function TimeReport(props) {
  const {
    changeSelectedDateTimeReport,
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
  } = props

  const dispatch = useDispatch()
  const developerId = useShallowEqualSelector(getProfileId)
  // eslint-disable-next-line no-unused-vars
  const [showEmpty, setShowEmpty] = useState(true)
  const { state: routeState } = useLocation()
  const todayDate = new Date()
  const { isMobile, isTablet } = useBreakpoints()

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

  useEffect(() => {
    if (!isEmpty(selectedDeveloper)) {
      const { id } = selectedDeveloper
      dispatch(getDeveloperProjectsById(id))
    } else if (roleUser === DEVELOPER) {
      dispatch(getDeveloperProjectsById(developerId))
    }
  }, [
    selectedDeveloper,
    selectedDate,
    reports,
    roleUser,
    dispatch,
    developerId,
  ])

  const bootstrapWidthRouteState = useCallback(() => {
    if (routeState) {
      const {
        selectedDate: routeDate,
        developer_project_id: route_developer_project_id,
        userId: route_user_id,
      } = routeState

      const { year: routeYear, month: routeMonth } = routeDate

      const { year: selectedYear, month: selectedMonth } = selectedDate

      const { developer_project_id: selectedDeveloper_project_id } =
        selectedProject

      if (selectedYear !== routeYear || selectedMonth !== routeMonth) {
        changeSelectedDateTimeReport({
          year: Number(routeYear),
          month: Number(routeMonth),
        })
      }

      if (roleUser !== DEVELOPER) {
        const developerData = developersList.find(
          (dev) => dev.id === route_user_id
        )
        if (developerData) {
          selectDevelopers(
            {
              id: developerData.id,
              name: developerData.name,
              email: developerData.email,
            },
            route_developer_project_id
          )
        }
        return
      }

      if (route_developer_project_id !== selectedDeveloper_project_id) {
        const newSelectedProject = projects.find(
          (project) =>
            project.developer_project_id === route_developer_project_id
        )
        selectProject(newSelectedProject)
      }
    }
  }, [
    changeSelectedDateTimeReport,
    developersList,
    projects,
    roleUser,
    selectedDate,
    routeState,
    selectDevelopers,
    selectedProject,
    selectProject,
  ])

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

  useEffect(() => {
    if (projects.length) {
      selectProject(projects[0])
    }
    if (!projects.length) {
      selectProject({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects])

  useEffect(() => {
    bootstrapWidthRouteState()
    return () => {
      clearSelectedProject()
      resetSelectedDate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        changeSelectedDateTimeReport={changeSelectedDateTimeReport}
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
      changeSelectedDateTimeReport={changeSelectedDateTimeReport}
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
  selectedDate: getSelectedDateTimeReport(state),
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
})

const actions = {
  changeSelectedDateTimeReport,
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
