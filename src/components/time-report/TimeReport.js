import React, { memo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import _ from 'lodash'
import { isEmpty } from 'lodash'

import ProjectSelect from './components/ProjectSelect'
import Day from './components/Day'
import DownloadIcon from 'components/ui/svg-components/download-icon'
import SelectMonth from 'components/ui/select-month'
import DeveloperSelect from './components/DeveloperSelect'
import Spinner from 'components/ui/spinner'
import SideMenu from 'components/side-menu'
import ProjectReportNew from 'components/project-report-new-design'

import {
  changeSelectedDateTimeReport,
  addTimeReport,
  resetSelectedDate,
  selectProject,
  clearSelectedProject,
  getTimeReportCsv,
  setUserStatus
} from 'actions/times-report'
import { selectDevelopers } from 'actions/developers'
import { getDeveloperProjectsById } from '../../actions/projects-management'
import {
  getSelectedDateTimeReport,
  getTimeReports,
  getIsFetchingReport,
  getSelectedProject,
  getSelecredDeveloper,
  getAllDays,
  getSelectedDay,
  getSelectDayStatus,
  getSelectedDayStatus,
  getDeveloperProjectsTR
} from 'selectors/timereports'
import { getProjectsSelector } from 'selectors/developer-projects'
import { getRoleUser } from 'selectors/user'
import { getDevelopersSelector } from 'selectors/developers'
import { DEVELOPER } from 'constants/role-constant'
import { parseMinToHoursAndMin } from 'utils/common'
import './style.scss'
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
    selectedDays,
    selectedDay,
    selectDayStatus,
    selectedDayStatus
  } = props
  
  const dispatch = useDispatch()
  const [showEmpty, setShowEmpty] = useState(true)
  const { state: routeState } = useLocation()
  const todayDate = new Date()

  const setStatusDayFromSlector =(status)=>{
    if(status.name === 'Hide empty days') {
      setShowEmpty(false);
    }else {
      setShowEmpty(true);
    }
  }
  
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

  useEffect(() => {
    if (!isEmpty(selectedDeveloper)) {
      const { id } = selectedDeveloper;
      dispatch( getDeveloperProjectsById(id))
    } 
  },[selectedDeveloper, selectedDate, reports])

  const totalHours = selectedDeveloperProjectsTR
    ? selectedDeveloperProjectsTR.reduce((res, item) => {
        return res + item.total_minutes
      }, 0)
    : 0

    const selectedProjectHours = reports && selectedProject
      ? reports.reduce((res, item) =>res + item.duration , 0)
    : 0
  
  const [currentPosition, setCurrentPosition] = useState(null)
  const savePosition = e => {
    setCurrentPosition(e?.target.offsetTop)
  }
  
  const bootstrapWidthRouteState = () => {
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
  }

  const handlerExportCsv = () => {
    if (!reports || reports?.length === 0) {
      return
    }
    getTimeReportCsv()
  }

  useEffect(()=>{
    if(currentPosition && !isFetchingReports){
      window.scrollTo(0, Number(currentPosition) - 100 )
      setCurrentPosition(null)
    }
  },[currentPosition,isFetchingReports])

  useEffect(() => {
    if (projects.length && _.isEmpty(selectedProject) && !routeState) {
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
        <div className="time_report_total_container">
          <h1>Time report</h1>
          {/* <div className="time_repord_checkbox">
           <label>
             <input
               type="checkbox"
               onChange={() => setShowEmpty(!showEmpty)}
               value={showEmpty}
             />
             <span>Hide Empty Days</span>
           </label>
          </div> */}
          <div className="time_report_total_hours">
            <span>
              Total hours spend this month:{` `}
              <strong>{parseMinToHoursAndMin(totalHours, true)}</strong>
            </span>
          </div>
        </div>
        <div className="time_report_header">
        </div>
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
            <SelectMonth
                selectedDate={selectedDate}
                setNewData={changeSelectedDateTimeReport}
              showYear="true"
                extraClassNameContainer="time_report_header_select_month"
            />
            {/* <FunnelSelect
                days={selectedDays}
                selectedDay={selectedDay}
                setStatusDay={setStatusDayFromSlector}
            /> */}
          </div>
          <div className="time_report_header_btn_section">
            <button className="export_btn" onClick={handlerExportCsv}>
              <span className="export_icon_container">
                <DownloadIcon />
              </span>
              <span className="export_btn_text">Export in XLSX</span>
            </button>
          </div>
        </div>
        <div className="time_report_day_row_titles">
          <div className='time_report_activity_day'>DATE</div>
          <div className='title-tasks'>TASKS</div>
          <div className='title-hours'>
            <span>HOURS</span>
            <strong className="total_hours_month">{parseMinToHoursAndMin(selectedProjectHours, true)}</strong>
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
                  savePosition={savePosition}
                  showEmpty={showEmpty}
                  isOpenCreate={isOpenCreate}
                  isOneProject={projects.length > 1}
                  selectDayStatus={selectDayStatus}
                  selectedDayStatus={selectedDayStatus}
                  setUserStatus={setUserStatus}
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
  selectedDeveloperProjectsTR: getDeveloperProjectsTR(state),
  selectedDays:getAllDays(state),
  selectedDay:getSelectedDay(state),
  selectDayStatus: getSelectDayStatus(state),
  selectedDayStatus: getSelectedDayStatus(state)
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
  getDeveloperProjectsTR
}

export default connect(mapStateToProps, actions)(memo(TimeReport))
