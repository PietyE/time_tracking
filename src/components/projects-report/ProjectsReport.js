import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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
import { DEVELOPER } from 'constants/role-constant'
import {
  changeSelectedDateProjectsReport,
  getDeveloperConsolidateProjectReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  getDevelopersProjectInProjectReport,
  setEditUserId,
  setExchangeRates,
} from 'actions/projects-report'
import { setProcessedStatus } from 'actions/users'
import {
  getProjectInTimeReportSelector,
  getSelectedProjectSelector,
  getEditingUserIdSelector,
  getSelectedMonthSelector,
  getSelectDeveloperInProjectReportSelector,
  getDevProjectConsolidateProjectReportsSelector,
} from 'reducers/projects-report'

function ProjectsReport({
  roleUser,
  selectedDate,
  changeSelectedDateProjectsReport,
  getDeveloperConsolidateProjectReport,
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
}) {
  const { users, total_usd, total_uah, exchange_rate } = projectsReports

  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const handlerCloseModalEdit = () => {
    setEditUserId('')
    setIsOpenEdit(false)
  }

  useEffect(() => {
    if (roleUser !== DEVELOPER) {
      getDevelopersProjectInProjectReport()
    }
    getDeveloperConsolidateProjectReport()
  }, [])

  return (
    <div className="container project_report_container">
      {isOpenEdit && (
        <EditUserModal handlerCloseModalEdit={handlerCloseModalEdit} />
      )}
      <div className="project_report_header_container">
        {roleUser !== DEVELOPER && (
          <div className="project_report_header_choice">
            <Select
              title="choose you project..."
              extraClassContainer="project_select_container"
              listItems={projectList}
              valueKey="name"
              idKey="id"
              isSearch={true}
              onSelected={setSelectedProjectInProjectReports}
              onClear={clearSelectedProjectInProjectReports}
              disabled={!_.isEmpty(selectedDeveloper)}
              initialChoice={selectedProject}
            />
            <Select
              title="choose developer..."
              extraClassContainer="developer_select_container"
              listItems={developersList}
              valueKey="name"
              idKey="id"
              isSearch={true}
              onSelected={setSelectedDeveloper}
              onClear={clearDeveloperSelected}
              disabled={!_.isEmpty(selectedProject)}
              initialChoice={selectedDeveloper}
            />
          </div>
        )}
        <SelectMonth
          selectedDate={selectedDate}
          setNewData={changeSelectedDateProjectsReport}
        />
      </div>
      {roleUser !== DEVELOPER && (
        <TotalValue
          totalUsd={total_usd}
          totalUah={total_uah}
          setExchangeRates={setExchangeRates}
          prevExchangeRate={exchange_rate}
          selectedDate={selectedDate}
        />
      )}
      <div className="table_container">
        <div className="table_scroll">
          <TableHeader roleUser={roleUser} />
          <div className="table_body_container">
            {users.map((user) => {
              const {
                name,
                developer_projects,
                current_rate,
                current_salary,
                id,
                total_expenses,
                total_overtimes,
                total: total_salary,
                comments,
                total_uah,
                is_processed,
              } = user

              const allProjectsName = developer_projects
                .map((project) => project.name)
                .join(', ')

              const commonProjectsInfo = {
                name: allProjectsName,
              }

              const comment = comments[0] ? comments[0].text : ''

              return (
                <RenderUser
                  commonProjectsInfo={commonProjectsInfo}
                  projects={developer_projects}
                  name={name}
                  rate={current_rate}
                  projectSalary={current_salary}
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
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const RenderUser = ({
  name = '',
  commonProjectsInfo = {},
  projects = [],
  rate = 0,
  projectSalary = 0,
  selectedDate = {},
  total_expenses,
  total_overtimes,
  total_salary,
  userId,
  roleUser,
  setEditUserId,
  setIsOpenEdit,
  comment,
  total_uah,
  is_processed,
  setProcessedStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handlerOpenMoreProject = (e) => {
    if (e.target.type === 'checkbox') {
      // setProcessedStatus({ userId, ...selectedDate })
      return
    }
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const totalHoursOvertime = projects.reduce((sum, project) => {
    if (!project.is_full_time) {
      return (sum = sum + project.working_time)
    }
    return sum
  }, 0)

  return (
    <div className="table_body_item">
      <TableRow
        project={commonProjectsInfo}
        projectSalary={projectSalary}
        name={name}
        rate={rate}
        onClick={handlerOpenMoreProject}
        extraClass={'common'}
        total_expenses={total_expenses}
        total_overtimes={total_overtimes}
        total_salary={total_salary}
        totalHoursOvertime={totalHoursOvertime}
        roleUser={roleUser}
        userId={userId}
        setEditUserId={setEditUserId}
        setIsOpenEdit={setIsOpenEdit}
        comment={comment}
        total_uah={total_uah}
        is_processed={is_processed}
        setProcessedStatus={setProcessedStatus}
        selectedDate={selectedDate}
      />
      {projects.map((project) => {
        return (
          <TableRow
            project={project}
            extraClass={isOpen ? 'more_project open' : 'more_project'}
            rate={rate}
            key={project.id}
            selectedDate={selectedDate}
            is_full_time={project.is_full_time}
            userId={userId}
            roleUser={roleUser}
          />
        )
      })}
    </div>
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
})

const actions = {
  changeSelectedDateProjectsReport,
  getDeveloperConsolidateProjectReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  getDevelopersProjectInProjectReport,
  setEditUserId,
  setExchangeRates,
  setProcessedStatus,
}

export default connect(mapStateToProps, actions)(ProjectsReport)
