import React, { memo, useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import ProjectSelect from './components/ProjectSelect'
import Day from './components/Day'
import DownloadIcon from 'components/ui/svg-components/download-icon'
import SelectMonth from 'components/ui/select-month'
import DeveloperSelect from './components/DeveloperSelect'
import { getUrlParams } from 'utils/common'
import {
  changeSelectedDateTimeReport,
  addTimeReport,
} from 'actions/timereports'
import { selectProject, clearSelectedProject } from 'actions/developer-projects'
import {
  getSelectedDateTimeReport,
  getTimeReports,
  getIsFetchingReport,
  getSelectedProject,
} from 'selectors/timereports'
import { getProjectsSelector } from 'selectors/developer-projects'
import Spinner from 'components/ui/spinner'
import './style.scss'
import { getRoleUser } from 'selectors/user'
import { DEVELOPER } from 'constants/role-constant'

function TimeReport({
  selectedDate,
  changeSelectedDateTimeReport,
  reports,
  addTimeReport,
  isFetchingReports,
  roleUser,
  projects,
  selectProject,
  clearSelectedProject,
  selectedProject = {},
}) {
  const [showEmpty, setShowEmpty] = useState(true)

  const searchString = useLocation().search
  const history = useHistory()

  const todayDate = new Date()

  const getDaysInMonth = date =>
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

  const bootstrapSearchParams = searchString => {
    const { year, month, developer_project } = getUrlParams(searchString)
    if (year && month && developer_project && projects) {
      changeSelectedDateTimeReport({
        year: Number(year),
        month: Number(month) - 1,
      })

      const selectedProject = projects.find(
        project => project.developer_project_id === developer_project
      )

      if (selectedProject) {
        selectProject(selectedProject)
      }
    }
  }

  useEffect(() => {
    const { year, month } = selectedDate
    if (
      year &&
      month !== undefined &&
      month !== null &&
      selectedProject &&
      selectedProject.developer_project_id
    ) {
      history.push({
        pathname: '/timereport',
        search: `?developer_project=${
          selectedProject.developer_project_id
        }&year=${year}&month=${month + 1}`,
      })
    }
  }, [selectedDate, selectedProject])

  useEffect(() => {
    bootstrapSearchParams(searchString)
    return () => {
      clearSelectedProject()
    }
  }, [projects])

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
            <ProjectSelect
              projectList={projects}
              clearSelectedProject={clearSelectedProject}
              selectProject={selectProject}
              selectedProject={selectedProject}
            />
            {roleUser !== DEVELOPER && <DeveloperSelect />}
          </div>
          <div className="time_report_header_btn_section">
            <SelectMonth
              selectedDate={selectedDate}
              setNewData={changeSelectedDateTimeReport}
              extraClassNameContainer="time_report_header_select_month"
            />
            <Button className="export_btn">
              <span className="export_icon_container">
                <DownloadIcon />
              </span>
              <span className="export_btn_text">Export</span>
            </Button>
          </div>
        </div>
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
        <div className="time_report_body_container">
          {!!reports ? (
            renderDaysArray.map((item, index) => {
              const numberOfDay = daySize - index
              const dataOfDay = reports.filter(
                report => numberOfDay === new Date(report.date).getDate()
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

const mapStateToProps = state => ({
  selectedDate: getSelectedDateTimeReport(state),
  reports: getTimeReports(state),
  isFetchingReports: getIsFetchingReport(state),
  roleUser: getRoleUser(state),
  projects: getProjectsSelector(state),
  selectedProject: getSelectedProject(state),
})

const actions = {
  changeSelectedDateTimeReport,
  addTimeReport,
  selectProject,
  clearSelectedProject,
}

export default memo(connect(mapStateToProps, actions)(TimeReport))
