import React, { useMemo, useEffect, useState, useContext } from 'react'

import clock from 'images/sideMenuIcons/clock.svg'
import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { getSelectedMonthSelector} from '../../../reducers/projects-report'
import useEqualSelector from '../../../custom-hook/useEqualSelector'
import { ProjectReportContext } from 'context/projectReport-context';
import ProjectList from './ProjectList';
import { parseMinToHoursAndMin, sortUserProjectReport } from 'utils/common';

function User (props) {
  const {
    name,
    email,
    userId,
    hours,
    userData,
    projects
  } = props;

  const contextType = useContext(ProjectReportContext);
  const selectedDate = useEqualSelector(getSelectedMonthSelector);
  const [sortProjects, setSortProjects] = useState([]);

  const userProjects = useMemo(() => {
    return projects.filter((project) => project.user.id === userId && (project.is_active || project.total_minutes !== 0 ) && (project.is_full_time !== null || project.overtime_minutes !== 0))
  }, [projects, userId])

  const projectList = useMemo(() => {
    const activeProject = [...userProjects].filter((project) => (project.is_active && project.is_full_time !== null))
    return  activeProject.map((project) => {
      return project.project.name
       }).join(', ')
  }, [userProjects])
 
  const formattedProjects = useMemo(
    () => userProjects.map(({ project: {  name }, is_active, is_full_time, overtime_minutes , id }) => ({
      developer_projects:{
          title:name,
          state_link:{
          userId: userId,
          developer_project_id: id,
          selectedDate,
          },
      },
      totalHours: (is_full_time) ? 'Salary' : parseMinToHoursAndMin(overtime_minutes, true) || 0,
      totalOvertime: (overtime_minutes) ?  parseMinToHoursAndMin(overtime_minutes, true) : 0,
      id: id,
      active_project: is_active,
      full_time: is_full_time
    })),
    [userProjects, selectedDate, userId]);
  
  useEffect(() => {
    const sortFormattedProjects = [...formattedProjects].sort(sortUserProjectReport);
    const currentProjects = sortFormattedProjects.filter((project) => project.full_time !== null)
    const pastProjects = sortFormattedProjects.filter((project) => project.full_time === null)
      setSortProjects([...currentProjects, ...pastProjects])
  }, [formattedProjects]);

  
  const chooseUser = (e) => {
    e.stopPropagation()
    contextType.chooseUser(userData)
    contextType.showWindowWithUserInfo()
  }

  return (
    <div className={`user_info ${contextType.selectedUserId === userId ? 'selected' : ''}`} onClick={chooseUser}>
      <div className='user_info_row'> 
        <img src={clock} alt="avatar" className="user_avatar" />
        <div className="name_email">
            <span className="name">{name}</span>
            <span className="email">{email}</span>
        </div>
        <div className="projects">
            <span className={`${userProjects.length ? '' : 'empty'}`}>{projectList}</span>
        </div>
        <div className="overtime_block">
            <span className="hours">{hours}</span>
        </div>
        {userProjects.length ?(<div className={`upArrow ${contextType.selectedUserId === userId ? 'selected' : ''}`}>
            <img src={upArrow} alt="" />
        </div>): null}
      </div> 
      <div className={`project_by_current_user ${contextType.selectedUserId === userId ? 'selected' : ''}`}>
        {sortProjects.map((project) => 
            (<ProjectList
                name={project.developer_projects.title} 
                key={project.id}
                hours={project.totalHours}
                stateDataForLink={project.developer_projects.state_link} 
                active_project={project.active_project}
                full_time={project.full_time}
                hoursOvertime = {project.totalOvertime}
              />)
        )}
      </div>   
    </div>
  )
}
export default User;