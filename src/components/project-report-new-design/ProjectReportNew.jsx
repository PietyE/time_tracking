import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import HeaderProjectReport from './components/HeaderProjectReport/HeaderProjectReport'
import WorkData from './components/WorkData/WorkData'
import ProjectData from './components/ProjectData/ProjectData'
import Comments from './components/Comments'

import SelectMonth from 'components/ui/select-month'
import { changeSelectedDateTimeReport } from 'actions/times-report'

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

import {selectCommentsByUserId} from 'selectors/project-report-details'

import { getSelectedDateTimeReport } from 'selectors/timereports'

function ProjectReportNew () {
  const selectedDate = useShallowEqualSelector(getSelectedDateTimeReport);
  const usersData = useShallowEqualSelector(selectUsersReports);
  const roleUser = useShallowEqualSelector(getUserRoleText);
  const currentUserId = useShallowEqualSelector(getProfileId);
  const userAvatarUrl = useShallowEqualSelector(getUserAvatarUrl);
  const [openComments, setOpenComments] = useState(false);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useMemo(() => {
    if (usersData) {
      return usersData.find(user => (user.id === currentUserId))
    }
  }, [currentUserId, usersData])
  const comments = useShallowEqualSelector(state => selectCommentsByUserId(state, currentUserId))
  useEffect(() => {
    if (roleUser !== DEVELOPER) {
      getDevelopersProject()
    }
    getConsolidateProject()
  }, [])

  const onSentNewData = (data) => {
    dispatch(changeSelectedDateTimeReport(data))
  }

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

  const renderUserProjects = () => {
    if(currentUser) {
      const {
        salary_uah,
        id,
        total_expenses,
        total_overtimes,
        total_salary,
        // comments,
        commentId,
        totalHoursOvertime,
        projects,
        salaryCurrency,
        rate_uah,
        rateCurrency
      } = currentUser
  const commonProjectsInfo = {
    name: '',
  }

  return (
    <div className="project_report_work_data">
    <WorkData salary={salary_uah}
              salaryCur={salaryCurrency}
              currencyRate={rateCurrency}
              total_hours={totalHoursOvertime}
              extra_costs={total_expenses} 
              salaryPerHour={rate_uah}
              comments_lenght={comments.length}
              openComments={openComments}
              firstBlockText={"SALARY"}
              secondBlockText={"HOURS WORKED"}
              thirdBlockText={"HOURLY RATE"}
              fourthBlockText={"EXTRA COSTS"} />
    <div className="component_project_data">
    <ProjectData projects={commonProjectsInfo}
                 overtime={totalHoursOvertime}
                 userId={id} />
    </div>             
    {openComments &&            
    <Comments comments={comments}
              commentId={commentId}
              avatarUrl={userAvatarUrl} />
    }
    </div>
  )
}
  }

  return (
    <ProjectReportContext.Provider value={{selected, onItemClick: buttonFocusOn, openComments: commentsOnOpen}}>
      <div className="project_report_container">
        <HeaderProjectReport id={currentUserId} name="Project report"/>
        <div className="diw_row" />
        <div className="project_report_date">
          <SelectMonth
            selectedDate={selectedDate}
            setNewData={onSentNewData}
            extraClassNameContainer="time_report_header_select_month"
            showYear="true"
          />
        </div>
           {renderUserProjects()}
      </div>
    </ProjectReportContext.Provider> 
  )
}

export default ProjectReportNew;