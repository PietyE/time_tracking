import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import TableRow from './components/TableRow'
import TableHeader from './components/TableHeader'

import './style.css'

const fakeData = [
  {
    name: 'Dasha Lukinova',
    projects: [
      {
        projectName: 'GetCompliant',
        projectSalary: 1000,
        projectRate: 10,
        hours: 3,
      },
      {
        projectName: 'Mebex',
        projectSalary: 1222,
        projectRate: 14,
        hours: 43,
      },
      {
        projectName: 'JobCast',
        projectSalary: 1456,
        projectRate: 6,
        hours: 89,
      },
    ],
  },
  {
    name: 'Viktor Vovk',
    projects: [
      {
        projectName: 'JobCast',
        projectSalary: 2000,
        projectRate: 16,
        hours: 47,
      },
    ],
  },
]

function TimeReport() {
  return (
    <div className="container">
      <TableHeader />
      <div className="table_body_container">
        {fakeData.map(user => {
          const { name, projects } = user
          const [firstProject, ...otherProject] = projects
          return (
            <RenderUser
              firstProject={firstProject}
              otherProject={otherProject}
              name={name}
              key={name}
            />
          )
        })}
      </div>
    </div>
  )
}

const RenderUser = ({ name = '', firstProject = {}, otherProject = [] }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handlerOpenMoreProject = () => {
    setIsOpen(!isOpen)
  }

  const isRenderOtherProject = !!otherProject.length

  return (
    <div className="table_body_item">
      <TableRow project={firstProject} name={name} />
      {otherProject.map(project => {
        return (
          <TableRow
            project={project}
            extraClass={isOpen ? 'more_project open' : 'more_project'}
            name={name}
            key={name + project.projectName}
          />
        )
      })}
      {isRenderOtherProject && (
        <div className="show_more_project_btn_container">
          <span onClick={handlerOpenMoreProject}>
            {isOpen ? 'Hide' : 'Show'} more projects {name}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={isOpen ? 'active' : ''}
          />
        </div>
      )}
    </div>
  )
}

export default TimeReport
