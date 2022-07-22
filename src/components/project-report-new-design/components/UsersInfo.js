import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { selectUsersReports, selectAllProjects } from 'reducers/projects-report'
import {
  getConsolidateProjectReport,
  getAllDevelopersProjectsPR,
} from 'actions/projects-report'
import { getRoleUser } from 'selectors/user'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import useSorting from 'custom-hook/useSorting'

import User from './User'
import { ASCEND } from 'constants/order-constant'
import SortingButton from 'components/ui/sortingButton'

function UsersInfo({ selectedDate }) {
  const SORT_NAME = 'name'

  const {
    sorting,
    sortingParameter,
    handleSortingChange,
    toggleSortingParameter,
  } = useSorting({ [SORT_NAME]: ASCEND })
  const usersData = useShallowEqualSelector(selectUsersReports)
  const usersProjects = useShallowEqualSelector(selectAllProjects)
  const roleUser = useShallowEqualSelector(getRoleUser)

  const dispatch = useDispatch()

  const setSortedReport = useCallback(() => {
    handleSortingChange(usersData)
  }, [usersData, handleSortingChange])

  useEffect(() => {
    setSortedReport()
  }, [usersData, selectedDate, sortingParameter, setSortedReport])

  const getConsolidateProject = useCallback(() => {
    dispatch(getConsolidateProjectReport())
  }, [dispatch])

  useEffect(() => {
    getConsolidateProject()
  }, [getConsolidateProject])

  useEffect(() => {
    dispatch(getAllDevelopersProjectsPR())
  }, [selectedDate, dispatch])

  return (
    <div className="users_table">
      <div className="users_table_header">
        <SortingButton
          title={SORT_NAME}
          onClick={() => toggleSortingParameter(SORT_NAME)}
          sortingType={sortingParameter?.name}
        />
        <span className="projects">PROJECTS</span>
        <span className="overtime">HOURS WORKED</span>
      </div>
      {sorting.map((user) => (
        <User
          name={user.name}
          key={user.id}
          email={user.email}
          userId={user.id}
          overtime={user.total_overtimes}
          hours={user.totalHoursOvertime}
          userData={user}
          selectedDate={selectedDate}
          projects={usersProjects}
        />
      ))}
    </div>
  )
}
export default UsersInfo
