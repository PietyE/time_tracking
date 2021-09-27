import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import _ from 'lodash'
import TableRow from './components/TableRow'
import TableHeader from './components/TableHeader'
import Select from 'components/ui/select'
import SelectMonth from 'components/ui/select-month'
import EditUserModal from './components/EditUserModal'
import TotalValue from './components/TotalValue'
import './style.scss'
import { getRoleUser } from 'selectors/user'
import { getDevelopersSelector } from 'selectors/developers'
import { DEVELOPER, PM } from 'constants/role-constant'
import {
  changeSelectedDateProjectsReport,
  // getDeveloperConsolidateProjectReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  getDevelopersProjectInProjectReport,
  setEditUserId,
  setExchangeRates,
  getConsolidateProjectReport,
} from 'actions/projects-report'
import { setProcessedStatus } from 'actions/users'
import {
  getProjectInTimeReportSelector,
  getSelectedProjectSelector,
  getEditingUserIdSelector,
  getSelectedMonthSelector,
  getSelectDeveloperInProjectReportSelector,
  getDevProjectConsolidateProjectReportsSelector,
  selectUsersReports,
} from 'reducers/projects-report'
import { getDevelopersList } from '../../selectors/developers'
import { getIsFetchingProjectsReport, getProjectsList } from '../../selectors/developer-projects'
import Spinner from '../ui/spinner'
import ActualRates from '../ui/actual-rates/ActualRates'
import { getRatesList } from '../../actions/currency'
import RenderUser from './components/RenderUser'

function ProjectsReport({
  roleUser,
  selectedDate,
  changeSelectedDateProjectsReport,
  // getDeveloperConsolidateProjectReport,
  projectsReports,
  developersList = [],
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  projectList = [],
  selectedDeveloper = {},
  getDevelopersProjectInProjectReport,
  selectedProject = {},
  setEditUserId,
  setExchangeRates,
  setProcessedStatus,
  isFetchingReports,
  getConsolidateProjectReport,
  selectUsersReports,
  getRatesList,
}) {
  const { total_usd, total_uah, exchange_rate } = projectsReports
  const users = selectUsersReports
  const scrollClassName = roleUser === PM ? 'overflow-hidden' : '';

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const allDevelopers = useSelector(getDevelopersList)
  const allProjects = useSelector(getProjectsList)
  const handlerCloseModalEdit = () => {
    setEditUserId('')
    setIsOpenEdit(false)
  }

  const handleChangeData = (data) => {
    const { month, year } = data;
    changeSelectedDateProjectsReport(data)
    const ratesParams = {
      year,
      month: month + 1,
      is_active: true
    }
    getRatesList(ratesParams)

  }

  useEffect(() => {
    if (roleUser !== DEVELOPER) {
      getDevelopersProjectInProjectReport()
    }
    // getDeveloperConsolidateProjectReport()
    getConsolidateProjectReport()
  }, [])
  return (
    <>
      {isFetchingReports && <Spinner />}
    <div className="container project_report_container">
      {isOpenEdit && (
        <EditUserModal handlerCloseModalEdit={handlerCloseModalEdit} />
      )}
      <div className="project_report_header_container">
        {roleUser !== DEVELOPER && roleUser !== PM && (
          <div className="project_report_header_choice">
            <Select
              title="choose your project..."
              extraClassContainer="project_select_container"
              listItems={allProjects}
              valueKey="name"
              idKey="id"
              isSearch={true}
              onSelected={setSelectedProjectInProjectReports}
              // onClear={clearSelectedProjectInProjectReports}
              // disabled={!_.isEmpty(selectedDeveloper)}
              disabled={
                selectedDeveloper.name !== 'All Developers' ? true : false
              }
              initialChoice={selectedProject}

            />
            <Select
              title="choose developer..."
              extraClassContainer="developer_select_container"
              listItems={allDevelopers}
              valueKey="name"
              idKey="id"
              isSearch={true}
              onSelected={setSelectedDeveloper}
              // disabled={!_.isEmpty(selectedProject)}
              // onClear={clearDeveloperSelected}
              disabled={selectedProject.name !== 'All Projects' ? true : false}
              initialChoice={selectedDeveloper}
            />
          </div>
        )}
        <SelectMonth
          selectedDate={selectedDate}
          setNewData={handleChangeData}
        />
      </div>

      {roleUser !== DEVELOPER && roleUser !== PM && (
        <TotalValue
          totalUsd={total_usd}
          totalUah={total_uah}
          setExchangeRates={setExchangeRates}
          prevExchangeRate={exchange_rate}
          selectedDate={selectedDate}
        />
      )}
      {roleUser !== DEVELOPER && roleUser !== PM && (
        <ActualRates />
      )}
      <div className={`table_container ${scrollClassName}`}>
        <div className="table_scroll">
          <TableHeader roleUser={roleUser} />
          <div className="table_body_container">
            {users.map((user) => {
              const {
                name,
                developer_projects,
                // current_rate,
                rate_uah,
                // current_salary,
                salary_uah,
                id,
                total_expenses,
                total_overtimes,
                total: total_salary,
                comments,
                total_uah,
                is_processed,
              } = user

              // const allProjectsName = developer_projects
              //   .map((project) => project.name)
              //   .join(', ')
              const allProjectsName = '';
              const commonProjectsInfo = {
                name: allProjectsName,
              }

              const comment = comments[0] ? comments[0].text : ''



              return (
                <RenderUser
                  commonProjectsInfo={commonProjectsInfo}
                  projects={developer_projects}
                  name={name}
                  // rate={current_rate}
                  rate={rate_uah}
                  // projectSalary={current_salary}
                  projectSalary={salary_uah}
                  key={id}
                  userId={id}
                  selectedDate={selectedDate}
                  total_expenses={total_expenses}
                  total_overtimes={total_overtimes}
                  total_salary={total_salary}
                  roleUser={roleUser}
                  setEditUserId={setEditUserId}
                  setIsOpenEdit={setIsOpenEdit}
                  comment={comment}
                  total_uah={total_uah}
                  is_processed={is_processed}
                  setProcessedStatus={setProcessedStatus}
                  isFetchingReports={isFetchingReports}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}



const mapStateToProps = (state) => ({
  roleUser: getRoleUser(state),
  selectedDate: getSelectedMonthSelector(state),
  projectsReports: getDevProjectConsolidateProjectReportsSelector(state),
  developersList: getDevelopersSelector(state),
  projectList: getProjectInTimeReportSelector(state),
  selectedDeveloper: getSelectDeveloperInProjectReportSelector(state),
  selectedProject: getSelectedProjectSelector(state),
  editingUserId: getEditingUserIdSelector(state),
  isFetchingReports: getIsFetchingProjectsReport(state),
  selectUsersReports: selectUsersReports(state),
})

const actions = {
  changeSelectedDateProjectsReport,
  // getDeveloperConsolidateProjectReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  getDevelopersProjectInProjectReport,
  setEditUserId,
  setExchangeRates,
  setProcessedStatus,
  getConsolidateProjectReport,
  getRatesList,
}

export default connect(mapStateToProps, actions)(ProjectsReport)
