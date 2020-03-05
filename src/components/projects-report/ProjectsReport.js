import React, { useState } from 'react'
import { connect } from 'react-redux'

import TableRow from './components/TableRow'
import TableHeader from './components/TableHeader'
import Select from 'components/ui/select'
import SelectMonth from 'components/ui/select-month'

import './style.scss'
import { getRoleUser } from 'selectors/user'
import { getSelectedMonthSelector } from 'selectors/projects-report'
import { DEVELOPER } from 'constants/role-constant'
import { changeSelectedDateProjectsReport } from 'actions/projects-report'

const fakeData = [
  {
    name: 'Viktor Vovk',
    rate: 16,
    projectSalary: 3000,
    projects: [
      {
        developer_project_id: '4893c4e3-c6e1-45b1-bebd-aa2fb6f8880f',
        id: '1ef5df7d-9ecc-4a13-8b47-74b3bdef4073',
        projectName: 'Vilmate Time Tracking',
        hours: 55,
      },
      {
        developer_project_id: 'b866062f-c029-4138-b0a1-2a7c4cbb6c77',
        id: 'cccd86e0-c865-4a85-90b3-1d107835449e',
        projectName: 'JobCast',
        hours: 45,
      },
      {
        developer_project_id: '1173fdd7-0cea-4c73-b978-51f3f9b5fcce',
        id: '93fb5705-bb17-4245-a3d9-75fcd927e1e6',
        projectName: 'Betting Service',
        hours: 60,
      },
    ],
  },
]

function ProjectsReport({
  roleUser,
  selectedDate,
  changeSelectedDateProjectsReport,
}) {
  return (
    <div className="container project_report_container">
      <div className="project_report_header_container">
        {roleUser !== DEVELOPER && (
          <div className="project_report_header_choice">
            <Select
              title="choose you project..."
              extraClassContainer="project_select_container"
            />

            <Select
              title="choose developer..."
              extraClassContainer="developer_select_container"
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
            {fakeData.map(user => {
              const { name, projects, rate, projectSalary } = user
              const allProjectsName = projects
                .map(project => project.projectName)
                .join(', ')

              const projectSum = projects.reduce(
                (sum, project) => ({
                  hours: sum.hours + project.hours,
                }),
                { projectSalary: 0, hours: 0 }
              )

              const commonProjectsInfo = {
                projectName: allProjectsName,
                ...projectSum,
              }
              return (
                <RenderUser
                  commonProjectsInfo={commonProjectsInfo}
                  projects={projects}
                  name={name}
                  rate={rate}
                  projectSalary={projectSalary}
                  key={name}
                  selectedDate={selectedDate}
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
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handlerOpenMoreProject = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="table_body_item">
      <TableRow
        project={commonProjectsInfo}
        projectSalary={projectSalary}
        name={name}
        rate={rate}
        onClick={handlerOpenMoreProject}
        extraClass={'common'}
      />
      {projects.map(project => {
        return (
          <TableRow
            project={project}
            extraClass={isOpen ? 'more_project open' : 'more_project'}
            rate={rate}
            key={name + project.projectName}
            selectedDate={selectedDate}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  roleUser: getRoleUser(state),
  selectedDate: getSelectedMonthSelector(state),
})

const actions = {
  changeSelectedDateProjectsReport,
}

export default connect(mapStateToProps, actions)(ProjectsReport)
