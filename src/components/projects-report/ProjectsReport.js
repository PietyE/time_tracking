import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import TableRow from './components/TableRow'
import TableHeader from './components/TableHeader'

import './style.css'

const fakeData = [
  {
    name: 'Dasha Lukinova',
    rate: 12,
    projects: [
      {
        projectName: 'GetCompliant',
        projectSalary: 1000,
        hours: 3,
      },
      {
        projectName: 'Mebex',
        projectSalary: 1222,
        hours: 43,
      },
      {
        projectName: 'JobCast',
        projectSalary: 1456,
        hours: 89,
      },
      {
        projectName: 'BankId',
        projectSalary: 890,
        hours: 30,
      },
    ],
  },
  {
    name: 'Viktor Vovk',
    rate: 16,
    projects: [
      {
        projectName: 'JobCast',
        projectSalary: 2000,
        hours: 47,
      },
    ],
  },
]

function ProjectsReport() {
  return (
    <div className="container">
      <TableHeader />
      <div className="table_body_container">
        {fakeData.map(user => {
          const { name, projects, rate } = user
          const allProjectsName = projects
            .map(project => project.projectName)
            .join(', ')

          const projectSum = projects.reduce(
            (sum, project) => ({
              projectSalary: sum.projectSalary + project.projectSalary,
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
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handlerOpenMoreProject = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="table_body_item">
      <TableRow
        project={commonProjectsInfo}
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
