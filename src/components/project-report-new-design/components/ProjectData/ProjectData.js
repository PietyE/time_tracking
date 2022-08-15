import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsersProjectReport } from 'actions/projects-report'

import Project from '../Project/Project'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { selectProjectsByUserId } from 'selectors/project-report-details'
import './projectData.scss'

function ProjectData(props) {
  const {
    // projects,
    // overtime,
    // extraClass = '',
    // is_full_time = false,
    // selectedDate = {},
    userId,
  } = props

  const dispatch = useDispatch()

  const loadProjects = () => {
    dispatch(getUsersProjectReport(userId))
  }

  useEffect(() => {
    loadProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const userProjects = useShallowEqualSelector((state) =>
    selectProjectsByUserId(state, userId)
  )

  return (
    <div className="project_data">
      <div className="project_data_header">
        <span className="headers project">PROJECT NAME</span>
        <span className="headers">OCCUPANCY</span>
        <span className="headers">HOURS</span>
        {/* <span className="headers total">TOTAL</span> */}
      </div>
      <div className="user_project">
        {userProjects.map((project) => (
          <Project
            project={project}
            key={project.id}
            // stateDataForLink={stateDataForLink}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectData
