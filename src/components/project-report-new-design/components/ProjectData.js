import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsersProjectReport } from '../../../actions/projects-report'

import Project from './Project';
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';
import { selectProjectsByUserId } from 'selectors/project-report-details';

function ProjectData (props) {
  const { projects,
          overtime,
          extraClass = '',
          is_full_time = false,
          selectedDate = {},
          userId
        } = props;

  const dispatch = useDispatch();

  const loadProjects = () => {
    dispatch(getUsersProjectReport(userId))
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const userProjects = useShallowEqualSelector((state) => selectProjectsByUserId(state, userId))
  console.log(userProjects)

  // const {
  //   working_time: hours,
  //   idDeveloperProjects: developer_project_id,
  //   total,
  //   name: projectName,
  // } = projects

  // let stateDataForLink = {
  //   userId,
  //   developer_project_id: userProjects.id,
  //   selectedDate,
  // }
  return (
    <div className="project_data">
      <div className="project_data_header">
        <span>PROJECT NAME</span>
        <span>OCCUPANCY</span>
        <span>HOURS</span>
        <span>TOTAL</span>
      </div>
      <div className="user_project">
          {userProjects.map(project => 
                    (<Project project={project}
                              key={project.id}
                              // stateDataForLink={stateDataForLink} 
                                    />)
                ) 
          }      
      </div>
    </div>
  )
}

export default ProjectData;