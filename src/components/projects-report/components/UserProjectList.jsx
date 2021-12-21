import React from 'react'
import { selectUserProjects } from '../../../selectors/project-report-details'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import TableRow from './TableRow'
import { getRoleUser } from '../../../selectors/user'


const UserProjectList = (props) => {
  const { userId, isOpen, selectedDate, rate } = props
  const userDetails = useSelector(selectUserProjects);
  const userRole = useSelector(getRoleUser);
  const user = userDetails[userId]

  if (!user) {
    return <></>
  }


  const { isFetching, error, success, projects } = user
  const showContent = !!(projects && projects.length)

  return (
    <>
      {isFetching &&
      <div className='spinner-small'>
        <Spinner animation='border' variant='success' />
      </div>
      }
      {!isFetching && error &&
      <p className='rate_item m-0 py-3 p-3 text-danger'>An error occurred while fetching project list</p>}
      {!isFetching && success && !showContent && <p>No data to display</p>}
      {!isFetching && success && showContent &&
      projects.map((item) => {
        const { idDeveloperProjects, total, is_full_time, working_time, } = item
        return (
          <TableRow
            project={item}
            extraClass={isOpen ? 'more_project open' : 'more_project'}
            rate={rate}
            key={idDeveloperProjects}
            selectedDate={selectedDate}
            is_full_time={is_full_time}
            totalHoursOvertime={working_time}
            total_overtimes={total}
            userId={userId}
            roleUser={userRole}
          />
        )
      })
      }
    </>
  )

}

export default UserProjectList
