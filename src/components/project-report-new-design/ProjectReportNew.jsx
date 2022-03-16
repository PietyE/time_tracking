import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import HeaderProjectReport from './components/HeaderProjectReport/HeaderProjectReport'
// import WorkData from './components/WorkData/WorkData'
import ProjectData from './components/ProjectData/ProjectData'
// import Comments from './components/Comments'
import SearchByProject from './components/SearchByProject';
import SearchByDeveloper from './components/SearchByDeveloper';
import UsersInfo from './components/UsersInfo';

import SelectMonth from 'components/ui/select-month'
import { changeSelectedDateProjectsReport } from 'actions/projects-report'

import { getProfileId, getUserRoleText, getUserAvatarUrl } from '../../selectors/user'
import { DEVELOPER, PM } from 'constants/role-constant'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import {ProjectReportContext} from 'context/projectReport-context'

import { selectUsersReports } from 'reducers/projects-report'

import {
  getDevelopersProjectInProjectReport,
  getConsolidateProjectReport
} from 'actions/projects-report'

import './projectReportNew.scss'

import { getSelectedDateTimeReport } from 'selectors/timereports'

function ProjectReportNew () {
  const selectedDate = useShallowEqualSelector(getSelectedDateTimeReport);
  const usersData = useShallowEqualSelector(selectUsersReports);
  const roleUser = useShallowEqualSelector(getUserRoleText);
  const currentUserId = useShallowEqualSelector(getProfileId);
  const userAvatarUrl = useShallowEqualSelector(getUserAvatarUrl);
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useMemo(() => {
    if (usersData) {
      return usersData.find(user => (user.id === currentUserId))
    }
  }, [currentUserId, usersData])

  // const comments = useShallowEqualSelector(state => selectCommentsByUserId(state, currentUserId))

  useEffect(() => {
    if (roleUser !== DEVELOPER) {
      getDevelopersProject()
    }
    getConsolidateProject()
  }, [])

  const handleChangeData = (data) => {
    const { month, year } = data;
    dispatch(changeSelectedDateProjectsReport(data));
  };

  const getDevelopersProject = () => {
    dispatch(getDevelopersProjectInProjectReport())
  }

  const getConsolidateProject = () => {
    dispatch(getConsolidateProjectReport())
  }

  const buttonFocusOn = (target) => {
    if (target) {
      if(target === selected){
        setSelected(null)
      } else {
        setSelected(target)
      }
    }
  }

  const commentsOnOpen = () => {
    setOpenComments(!openComments)
  }

  const userWindowInfoOpen = (e) => {
    setOpenUserInfo(true)
  }

  const userWindowInfoClose = (e) => {
    setOpenUserInfo(false)
  }

  const selectUser = (user) => {
    if (user !== userSelected) {
      setUserSelected(user)
      setSelectedUserId(user.id)
    } else {
      setUserSelected(null)
      setSelectedUserId(null)
    }
  }

  return (
    <ProjectReportContext.Provider value={{selected,
                                          selectedUserId, 
                                          onItemClick: buttonFocusOn, 
                                          openComments: commentsOnOpen,
                                          showWindowWithUserInfo: userWindowInfoOpen,
                                          closeWindowWithUserInfo: userWindowInfoClose,
                                          chooseUser: selectUser,}}>
      <div className="project_report_container">
        <HeaderProjectReport id={currentUserId} name="Project report"/>
        <div className="diw_row" />
        <div className="project_report_date">
         <SearchByDeveloper />
          <div className="row">
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10" height="1.5" fill="#616161"/>
          </svg>
          </div>
          <SearchByProject />
          <div className="select_month">
            <SelectMonth
              selectedDate={selectedDate}
              setNewData={handleChangeData}
              extraClassNameContainer="time_report_header_select_month"
              showYear="true"
            />
          </div>
        </div>
           {/* {renderUserProjects()} */}
           <UsersInfo selectedDate={selectedDate}/>
      </div>
    </ProjectReportContext.Provider> 
  )
}

export default ProjectReportNew;