import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { selectUsersReports, selectAllProjects } from 'reducers/projects-report';
import { getConsolidateProjectReport, getAllDevelopersProjectsPR } from 'actions/projects-report';
import { getRoleUser } from 'selectors/user';
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';
import useSorting from 'custom-hook/useSorting';

import User from './User'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { DEVELOPER } from 'constants/role-constant';

function UsersInfo (props) {
  const {
    selectedDate,
  } = props

  const { sorting, sortingParameter, handleSortingChange, toggleSortingParameter } = useSorting()
  const usersData = useShallowEqualSelector(selectUsersReports);
  const usersProjects = useShallowEqualSelector(selectAllProjects);
  const roleUser = useShallowEqualSelector(getRoleUser);
console.log(roleUser);
  const SORT_NAME = 'name'

  const dispatch = useDispatch();

  const setSortedReport = useCallback(() => {
    handleSortingChange(usersData)
  }, [usersData, sortingParameter])

  useEffect(() => {
    setSortedReport();
  }, [usersData, selectedDate, sortingParameter])

  useEffect(() => {
    getConsolidateProject()
  }, [])

  useEffect(() => {
    dispatch(getAllDevelopersProjectsPR())
  }, [selectedDate])

  const getConsolidateProject = () => {
    dispatch(getConsolidateProjectReport())
  }

  return (
    <div className="users_table">
      <div className="users_table_header">
        <div className="name_ordering">
          <span className={`name ${roleUser !== DEVELOPER ? 'name_sorting' : ''}`} onClick={() => toggleSortingParameter(SORT_NAME)}>NAME</span>
          {roleUser !== DEVELOPER  ? (<div className="arrows">
            <div className={`arrow ${((sortingParameter?.name === null || sortingParameter?.name === undefined) ? 'disable' : sortingParameter.name ? '' : 'disable')}`}>
              <FontAwesomeIcon
                      icon={faCaretUp}
                      color="#414141"
                      className="icon pencil_icon"
                    />
            </div>
            <div className={`arrow ${((sortingParameter?.name === null || sortingParameter?.name === undefined) ? 'disable' : !sortingParameter.name ? '' : 'disable')} `}>
              <FontAwesomeIcon
                      icon={faCaretDown}
                      color="#414141"
                      className="icon pencil_icon"
                    />
            </div>
          </div>) : null}
        </div>
        <span className="projects">PROJECTS</span>
        <span className="overtime">HOURSE WORKED</span>
      </div>
      {sorting.map((user) => 
        (<User name={user.name} 
              key={user.id}
              email={user.email}
              userId={user.id}
              overtime={user.total_overtimes}
              hours={user.totalHoursOvertime}
              userData={user}
              selectedDate={selectedDate}
              projects = {usersProjects}
              />)
      )}
    </div>
  )
}
export default UsersInfo;