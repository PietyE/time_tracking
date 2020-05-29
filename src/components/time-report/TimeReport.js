import React, { memo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import _ from 'lodash'

import ProjectSelect from './components/ProjectSelect'
import Day from './components/Day'
import DownloadIcon from 'components/ui/svg-components/download-icon'
import SelectMonth from 'components/ui/select-month'
import DeveloperSelect from './components/DeveloperSelect'
import Spinner from 'components/ui/spinner'
import {
  changeSelectedDateTimeReport,
  addTimeReport,
  resetSelectedDate,
  selectProject,
  clearSelectedProject,
  getTimeReportCsv,
} from 'actions/times-report'
import { selectDevelopers } from 'actions/developers'
import {
  getSelectedDateTimeReport,
  getTimeReports,
  getIsFetchingReport,
  getSelectedProject,
  getSelecredDeveloper,
} from 'selectors/timereports'
import { getProjectsSelector } from 'selectors/developer-projects'
import { getRoleUser } from 'selectors/user'
import { getDevelopersSelector } from 'selectors/developers'
import { DEVELOPER } from 'constants/role-constant'
import { parseMinToHoursAndMin } from 'utils/common'
import './style.scss'

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
    getTimeReportCsv,
  } = props

  const [showEmpty, setShowEmpty] = useState(true)

  const { state: routeState } = useLocation()

  const todayDate = new Date()

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

  const totalHours = reports
    ? reports.reduce((res, item) => {
        return res + item.duration
      }, 0)
    : 0

  const bootstrapWidthRouteState = () => {
    if (routeState) {
      const {
        selectedDate: routeDate,
        developer_project_id: route_developer_project_id,
        userId: route_user_id,
      } = routeState

      const { year: routeYear, month: routeMonth } = routeDate

      const { year: selectedYear, month: selectedMonth } = selectedDate

      const {
        developer_project_id: selectedDeveloper_project_id,
      } = selectedProject

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
  }

  const handlerExportCsv = () => {
    if (!reports || reports.length === 0) {
      return
    }
    getTimeReportCsv()
  }

  useEffect(() => {
    if (projects.length && _.isEmpty(selectedProject) && !routeState) {
      selectProject(projects[0])
    }
  }, [projects])

  useEffect(() => {
    bootstrapWidthRouteState()
    // return () => {
    //   clearSelectedProject()
    //   resetSelectedDate()
    // }
  }, [])

  return (
    <>
      {isFetchingReports && <Spinner />}
      <div
        className={
          isFetchingReports
            ? 'time_report_container container fetching'
            : 'time_report_container container'
        }
      >
        <div className="time_report_header">
          <div className="time_report_header_select_section">
            {roleUser !== DEVELOPER && (
              <DeveloperSelect
                developersList={developersList}
                selectedDeveloper={selectedDeveloper}
              />
            )}
            <ProjectSelect
              projectList={projects}
              clearSelectedProject={clearSelectedProject}
              selectProject={selectProject}
              selectedProject={selectedProject}
            />
          </div>
          <div className="time_report_header_btn_section">
            <SelectMonth
              selectedDate={selectedDate}
              setNewData={changeSelectedDateTimeReport}
              extraClassNameContainer="time_report_header_select_month"
            />
            <button className="export_btn" onClick={handlerExportCsv}>
              <span className="export_icon_container">
                <DownloadIcon />
              </span>
              <span className="export_btn_text">Export</span>
            </button>
          </div>
        </div>
        <div className="time_report_total_container">
          <div className="time_repord_checkbox">
            <label>
              <input
                type="checkbox"
                onChange={() => setShowEmpty(!showEmpty)}
                value={showEmpty}
              />
              <span>Hide Empty Days</span>
            </label>
          </div>
          <div className="time_report_total_hours">
            <span>
              Total hours:{` `}
              <strong>{parseMinToHoursAndMin(totalHours)}</strong>
            </span>
          </div>
        </div>
        <div className="time_report_body_container">
          {reports ? (
            renderDaysArray.map((item, index) => {
              const numberOfDay = daySize - index
              const dataOfDay = reports.filter(
                (report) => numberOfDay === new Date(report.date).getDate()
              )
              const isOpenCreate =
                todayDate.getDate() === numberOfDay &&
                todayDate.getMonth() === selectedDate.month &&
                todayDate.getFullYear() === selectedDate.year
              return (
                <Day
                  key={index}
                  numberOfDay={numberOfDay}
                  selectedDate={selectedDate}
                  descriptions={dataOfDay}
                  addTimeReport={addTimeReport}
                  showEmpty={showEmpty}
                  isOpenCreate={isOpenCreate}
                />
              )
            })
          ) : (
            <div>Please, choose your project...</div>
          )}
        </div>
      </div>
    </>
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
})

const actions = {
  changeSelectedDateTimeReport,
  addTimeReport,
  selectProject,
  clearSelectedProject,
  resetSelectedDate,
  selectDevelopers,
  getTimeReportCsv,
}

export default connect(mapStateToProps, actions)(memo(TimeReport))
