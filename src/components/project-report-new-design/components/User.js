import React, { useMemo, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux';

import clock from 'images/sideMenuIcons/clock.svg'
import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { Link } from 'react-router-dom'

import { selectProjectsByUserId } from 'selectors/project-report-details';
import { getSelectedMonthSelector } from '../../../reducers/projects-report'
import { getUsersProjectReport } from 'actions/projects-report';
import { selectUserProjects } from '../../../selectors/project-report-details'
import useEqualSelector from '../../../custom-hook/useEqualSelector'
import { ProjectReportContext } from 'context/projectReport-context';
import ProjectList from './ProjectList';

function User (props) {
  const {
    name,
    email,
    userId,
    hours,
    userData,
  } = props;

  const contextType = useContext(ProjectReportContext);
  const dispatch = useDispatch();
  const selectedDate = useEqualSelector(getSelectedMonthSelector);

  const loadProjects = () => {
    dispatch(getUsersProjectReport(userId))
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const userProjects = useEqualSelector((state) => selectProjectsByUserId(state, userId))
  const projectList = userProjects.map((project) => {
    return project.name
  }).join(', ')

  const userDetails = useEqualSelector(selectUserProjects);
  const user = userDetails[userId];
  const {  projects = [] } = user || {};

  const loadProjectByTarget = useMemo(() => {
    loadProjects()
  }, [selectedDate])

  const formattedProjects = useMemo(
    () => projects.map(({ name, is_active, is_full_time, working_time, idDeveloperProjects }) => ({
      name: '',
      developer_projects:{
          link:(
              <Link
                  to={{
                      pathname: '/timereport',
                      state: {
                          userId: userId,
                          developer_project_id: idDeveloperProjects,
                          selectedDate,
                      },
                  }}
              >
                  {name}
              </Link>),
          title:name


      },
      totalHours: is_full_time ? 'fulltime' : `${working_time || 0} `,
      id: idDeveloperProjects,
      active_project: is_active,
    })),
    [projects, selectedDate]);

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
            (<ProjectList name={project.developer_projects.title} 
                key={project.id}
                hours={project.totalHours}
            />)
        )}
      </div>   
    </div>
  )
}
export default User;