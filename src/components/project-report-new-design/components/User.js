import React, { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux';

import clock from 'images/sideMenuIcons/clock.svg'
import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { selectProjectsByUserId } from 'selectors/project-report-details';
import { getUsersProjectReport } from 'actions/projects-report';
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';
import { ProjectReportContext } from 'context/projectReport-context';
import ProjectList from './ProjectList';

function User (props) {
  const {
    name,
    email,
    userId,
    salary,
    overtime,
    hours,
    userData,
    selectedDate,
    commentsOn
  } = props;

  const contextType = useContext(ProjectReportContext);
  const dispatch = useDispatch();
  const [openArrow, setOpenArrow] = useState(false)

  const loadProjects = () => {
    dispatch(getUsersProjectReport(userId))
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const userProjects = useShallowEqualSelector((state) => selectProjectsByUserId(state, userId))
  const projectList = userProjects.map((project) => {
    return project.name
  }).join(', ')
console.log(userProjects)
  const chooseUser = (e) => {
    e.stopPropagation()
    contextType.chooseUser(userData)
    contextType.showWindowWithUserInfo()
  }

  return (
    <div className={`user_info ${contextType.selectedUserId === userId ? "selected" : ""}`} onClick={chooseUser}>
      <div className='user_info_row'> 
        <img src={clock} alt="avatar" className="user_avatar" />
        <div className="name_email">
            <span className="name">{name}</span>
            <span className="email">{email}</span>
        </div>
        <div className="projects">
            <span className={`${!!userProjects.length ? {} : "empty"}`}>{projectList}</span>
        </div>
        <div className="overtime_block">
            <span className="hours">{hours}</span>
        </div>
        <div className={`upArrow ${contextType.selectedUserId === userId ? "selected" : ""}`}>
            <img src={upArrow} alt="" />
        </div>
      </div> 
      <div className={`project_by_current_user ${contextType.selectedUserId === userId ? "selected" : ""}`}>
        {userProjects.map((project) => 
            (<ProjectList name={project.name} 
                key={project.id}
                hours={project.totalHoursOvertime}
            />)
        )}
      </div>   
    </div>
  )
}
export default User;