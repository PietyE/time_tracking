import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import HeaderProjectReport from './components/HeaderProjectReport'
import WorkData from './components/WorkData'
import ProjectData from './components/ProjectData'

import SelectMonth from 'components/ui/select-month'
import { changeSelectedDateTimeReport } from 'actions/times-report'

import { getProfileName, getUserRoleText } from '../../selectors/user'
import { DEVELOPER, PM } from 'constants/role-constant'

import {
  getProjectInTimeReportSelector,
  getSelectedProjectSelector,
  getEditingUserIdSelector,
  getSelectedMonthSelector,
  getSelectDeveloperInProjectReportSelector,
  getDevProjectConsolidateProjectReportsSelector,
  selectUsersReports, getEditingUser,
} from 'reducers/projects-report'

import {
  changeSelectedDateProjectsReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  getDevelopersProjectInProjectReport,
  setEditUserId,
  setExchangeRates,
  getConsolidateProjectReport,
} from 'actions/projects-report'

import './projectReportNew.scss'

import { getSelectedDateTimeReport } from 'selectors/timereports'

function ProjectReportNew () {
  const selectedDate = useSelector(getSelectedDateTimeReport);
  const usersData = useSelector(selectUsersReports);
  const roleUser = useSelector (getUserRoleText);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roleUser !== DEVELOPER) {
      getDevelopersProject()
    }
    getConsolidateProject()
  }, [])

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

  const onSentNewData = (data) => {
    dispatch(changeSelectedDateTimeReport(data))
  }

  const getDevelopersProject = () => {
    dispatch(getDevelopersProjectInProjectReport())
  }

  const getConsolidateProject = () => {
    dispatch(getConsolidateProjectReport())
  }

  const users = usersData;
  console.log(users);

  return (
    <>
      <div className="project_report_container">
        <HeaderProjectReport />
        <div className="diw_row" />
        <div className="project_report_date">
          <SelectMonth
            selectedDate={selectedDate}
            setNewData={onSentNewData}
            extraClassNameContainer="time_report_header_select_month"
            showYear="true"
          />
        </div>
        <div className="project_report_work_data">
          {!!users?.length && (
            <>
            {users.map((user) => {
                    const {
                      name,
                      developer_projects,
                      // current_rate,
                      rate_uah,
                      // current_salary,
                      salary_uah,
                      salaryCurrency,
                      rateCurrency,
                      id,
                      total_expenses,
                      total_overtimes,
                      total_salary,
                      comments,
                      total_uah,
                      is_processed,
                      totalHoursOvertime,
                    } = user
              return (
                <>
                <WorkData total_salary={salary_uah}
                          total_hours={totalHoursOvertime}
                          extra_costs={total_expenses} />
                <ProjectData projects={developer_projects} />
                </>
              )
            })}
            </>
        )}
        </div>
      </div>
    </>
  )
}

export default ProjectReportNew;