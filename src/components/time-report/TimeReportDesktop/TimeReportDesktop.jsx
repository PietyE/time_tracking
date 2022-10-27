import React from 'react'
import SelectMonth from 'components/ui/select-month'
import DownloadIcon from 'components/ui/svg-components/download-icon'
import { DEVELOPER } from 'constants/role-constant'
import { parseMinToHoursAndMin } from 'utils/common'
import Day from '../components/Day'
import DeveloperSelect from '../components/DeveloperSelect'
import ProjectSelect from '../components/ProjectSelect'
import SpinnerStyled from 'components/ui/spinner'
import '../style.scss'
import { useScrollLock } from 'custom-hook/useScrollLock'
import { userPermissions } from 'constants/permissions'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getUserPermissions } from 'selectors/user'

// TODO: Refactor component and its render
export const TimeReportDesktop = ({
  isFetchingReports,
  totalHours,
  roleUser,
  developersList,
  selectedDeveloper,
  projects,
  clearSelectedProject,
  selectProject,
  selectedProject,
  selectedDate,
  changeSelectedDateTimeReport,
  handlerExportCsv,
  selectedProjectHours,
  reports,
  renderDaysArray,
  daySize,
  todayDate,
  addTimeReport,
  showEmpty,
  selectDayStatus,
  selectedDayStatus,
  setUserStatus,
}) => {
  const permissions = useShallowEqualSelector(getUserPermissions)
  const isHaveAccessToViewAllWorkItems =
    permissions?.includes(userPermissions.work_items_view_workitem) &&
    permissions?.includes(userPermissions.users_view_user) &&
    permissions?.includes(userPermissions.projects_view_project) &&
    permissions?.includes(userPermissions.projects_view_developerproject)
  useScrollLock(isFetchingReports)
  return (
    <>
      {isFetchingReports && <SpinnerStyled fullScreenBlurred />}
      <div className="time_report_container container">
        <div className="time_report_total_container">
          <h1>Time report</h1>
          <div className="time_report_total_hours">
            <span>
              Total hours spend this month:
              <strong>{parseMinToHoursAndMin(totalHours, true)}</strong>
            </span>
          </div>
        </div>
        <div className="time_report_header"></div>
        <div className="time_report_header">
          <div className="time_report_header_select_section">
            {(roleUser !== DEVELOPER || isHaveAccessToViewAllWorkItems) && (
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
            <SelectMonth onChange={changeSelectedDateTimeReport} showYear />
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
          <div className="time_report_activity_day">DATE</div>
          <div className="title-tasks">TASKS</div>
          <div className="title-hours">
            <span>HOURS</span>
            <strong className="total_hours_month">
              {parseMinToHoursAndMin(selectedProjectHours, true)}
            </strong>
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
