// eslint-disable-next-line no-unused-vars
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react'
import { useDispatch } from 'react-redux'

import HeaderProjectReport from './components/HeaderProjectReport/HeaderProjectReport'
// import WorkData from './components/WorkData/WorkData'
// import Comments from './components/Comments'
import SearchByProject from './components/SearchByProject'
import SearchByDeveloper from './components/SearchByDeveloper'
import UsersInfo from './components/UsersInfo'
import SpinnerStyled from 'components/ui/spinner'

import SelectMonth from 'components/ui/select-month'
import { changeSelectedDateProjectsReport } from 'actions/projects-report'

import { getProfileId, getRoleUser } from 'selectors/user'
import { getIsFetchingProjectsReport } from 'selectors/developer-projects'
import { DEVELOPER } from 'constants/role-constant'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { ProjectReportContext } from 'context/projectReport-context'

import {
  // selectUsersReports,
  getSelectedMonthSelector,
} from 'reducers/projects-report'

import { getDevelopersProjectInProjectReport } from 'actions/projects-report'

import './projectReportNew.scss'
import { Button } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'

function ProjectReportNew() {
  const isFetchingReports = useShallowEqualSelector(getIsFetchingProjectsReport)
  const selectedDate = useShallowEqualSelector(getSelectedMonthSelector)
  // const usersData = useShallowEqualSelector(selectUsersReports);
  const roleUser = useShallowEqualSelector(getRoleUser)
  const currentUserId = useShallowEqualSelector(getProfileId)
  // eslint-disable-next-line no-unused-vars
  const [openUserInfo, setOpenUserInfo] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [userSelected, setUserSelected] = useState(null)
  const [selected, setSelected] = useState(null)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  // const currentUser = useMemo(() => {
  //   if (usersData) {
  //     return usersData.find(user => (user.id === currentUserId))
  //   }
  // }, [currentUserId, usersData])

  // const comments = useShallowEqualSelector(state => selectCommentsByUserId(state, currentUserId))

  //useLayoutEffect because if we got error from google auth success we will have error page for a some secs before our page is reloading

  useLayoutEffect(() => {
    if (location.state.from === 'google-sync-non-auth') {
      history.replace({
        state: {},
      })
      window.location.reload()
    }
  }, [])

  const getDevelopersProject = useCallback(() => {
    dispatch(getDevelopersProjectInProjectReport())
  }, [dispatch])

  useEffect(() => {
    if (roleUser !== DEVELOPER) {
      getDevelopersProject()
    }
  }, [getDevelopersProject, roleUser])

  const handleChangeData = useCallback(
    (data) => {
      dispatch(changeSelectedDateProjectsReport(data))
    },
    [dispatch]
  )

  const buttonFocusOn = (target) => {
    if (target) {
      if (target === selected) {
        setSelected(null)
      } else {
        setSelected(target)
      }
    }
  }

  const commentsOnOpen = () => {
    setOpenComments(!openComments)
  }

  const userWindowInfoOpen = () => {
    setOpenUserInfo(true)
  }

  const userWindowInfoClose = () => {
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
    <ProjectReportContext.Provider
      value={{
        selected,
        selectedUserId,
        onItemClick: buttonFocusOn,
        openComments: commentsOnOpen,
        showWindowWithUserInfo: userWindowInfoOpen,
        closeWindowWithUserInfo: userWindowInfoClose,
        chooseUser: selectUser,
      }}
    >
      {isFetchingReports && <SpinnerStyled />}
      <div className="project_report_container">
        <HeaderProjectReport id={currentUserId} name="Project report" />
        <div className="diw_row" />
        <div className="project_report_date">
          {roleUser !== DEVELOPER && (
            <div className="block_select_elements">
              <SearchByDeveloper />
              <div className="row">
                <svg
                  width="10"
                  height="2"
                  viewBox="0 0 10 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="10" height="1.5" fill="#616161" />
                </svg>
              </div>
              <SearchByProject />
            </div>
          )}
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
        <UsersInfo selectedDate={selectedDate} />
      </div>
    </ProjectReportContext.Provider>
  )
}

export default ProjectReportNew
