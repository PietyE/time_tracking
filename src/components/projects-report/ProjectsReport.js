import React, { useState } from 'react'

import TableRow from './components/TableRow'
import TableHeader from './components/TableHeader'
import Select from 'components/ui/select'
import SelectMonth from 'components/ui/select-month'

import './style.css'

const fakeData = [
  {
    name: 'Dasha Lukinova',
    rate: 12,
    projectSalary: 2000,
    projects: [
      {
        projectName: 'GetCompliant',
        hours: 3,
      },
      {
        projectName: 'Mebex',
        hours: 43,
      },
      {
        projectName: 'JobCast',
        hours: 89,
      },
      {
        projectName: 'BankId',
        hours: 30,
      },
    ],
  },
  {
    name: 'Viktor Vovk',
    rate: 16,
    projectSalary: 3000,
    projects: [
      {
        projectName: 'JobCast',
        hours: 47,
      },
    ],
  },
]

function ProjectsReport() {
  return (
    <div className="container">
      <div className="project_report_header_container">
        <div className="project_report_header_choice">
          <Select title="choose you project..." />
          <Select title="choose you developer..." />
        </div>
        <SelectMonth />
      </div>
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
            />
          )
        })}
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
          />
        )
      })}
      {/* {isRenderOtherProject && (
        <div className="show_more_project_btn_container">
          <span onClick={handlerOpenMoreProject}>
            {isOpen ? 'Hide' : 'Show'} more projects {name}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={isOpen ? 'active' : ''}
          />
        </div>
      )} */}
    </div>
  )
}

export default ProjectsReport
