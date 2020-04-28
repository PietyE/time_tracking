import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import TableRow from './components/TableRow'
import TableHeader from './components/TableHeader'
import Select from 'components/ui/select'
import SelectMonth from 'components/ui/select-month'

import './style.scss'
import { getRoleUser } from 'selectors/user'
import { getDevelopersSelector } from 'selectors/developers'
import { getSelectedMonthSelector } from 'selectors/projects-report'
import { getProjectsSelector } from 'selectors/developer-projects'
import { DEVELOPER } from 'constants/role-constant'
import {
  changeSelectedDateProjectsReport,
  getDeveloperConsolidateProjectReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
} from 'actions/projects-report'
import { getDevProjectConsolidateProjectReportsSelector } from 'selectors/projects-report'

function ProjectsReport({
  roleUser,
  selectedDate,
  changeSelectedDateProjectsReport,
  getDeveloperConsolidateProjectReport,
  projectsReports,
  developersList,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  projectList,
}) {
  useEffect(() => {
    getDeveloperConsolidateProjectReport()
  }, [])

  return (
    <div className="container project_report_container">
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
            />

            <Select
              title="choose developer..."
              extraClassContainer="developer_select_container"
              listItems={developersList}
              valueKey="name"
              idKey="id"
              isSearch={true}
              // initialChoice={chosenDeveloper}
              onSelected={setSelectedDeveloper}
              onClear={clearDeveloperSelected}
            />
          </div>
        )}
        <SelectMonth
          selectedDate={selectedDate}
          setNewData={changeSelectedDateProjectsReport}
        />
      </div>
      <div className="table_container">
        <div className="table_scroll">
          <TableHeader />
          <div className="table_body_container">
            {projectsReports.map((user) => {
              const {
                name,
                developer_projects,
                current_rate,
                current_salary,
                id,
                total_expenses,
                total_overtimes,
                total: total_salary,
              } = user

              const allProjectsName = developer_projects
                .map((project) => project.name)
                .join(', ')

              const commonProjectsInfo = {
                name: allProjectsName,
              }

              return (
                <RenderUser
                  commonProjectsInfo={commonProjectsInfo}
                  projects={developer_projects}
                  name={name}
                  rate={current_rate}
                  projectSalary={current_salary}
                  key={id}
                  selectedDate={selectedDate}
                  total_expenses={total_expenses}
                  total_overtimes={total_overtimes}
                  total_salary={total_salary}
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
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handlerOpenMoreProject = () => {
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
  projectList: getProjectsSelector(state),
})

const actions = {
  changeSelectedDateProjectsReport,
  getDeveloperConsolidateProjectReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
}

export default connect(mapStateToProps, actions)(ProjectsReport)
