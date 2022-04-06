import React, { useMemo, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux';

import clock from 'images/sideMenuIcons/clock.svg'
import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { getSelectedMonthSelector} from '../../../reducers/projects-report'
import { getUsersProjectReport } from 'actions/projects-report';
import { selectUserProjects } from '../../../selectors/project-report-details'
import useEqualSelector from '../../../custom-hook/useEqualSelector'
import { ProjectReportContext } from 'context/projectReport-context';
import ProjectList from './ProjectList';
import { parseMinToHoursAndMin } from 'utils/common';

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

  const userProjects = useMemo(() => {
    return projects.filter((project) => project.user.id === userId && (project.is_active || project.total_minutes !== 0))
  }, [projects])

  const projectList = useMemo(() => {
    return  userProjects.map((project) => {
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
      totalHours: (is_full_time) ? 'fulltime' : parseMinToHoursAndMin(overtime_minutes , true) || 0,
      id: id,
      active_project: is_active,
    })),
    [userProjects, selectedDate]);
  console.log(userProjects);
    console.log(formattedProjects);
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
        {formattedProjects.map((project) => 
            (<ProjectList
                name={project.developer_projects.title} 
                key={project.id}
                hours={project.totalHours}
                stateDataForLink={project.developer_projects.state_link} 
              />)
        )}
      </div>   
    </div>
  )
}
export default User;