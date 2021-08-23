import React, { useState } from 'react'
import { getUsersProjectReport } from '../../../actions/projects-report'
import TableRow from './TableRow'
import { useDispatch } from 'react-redux'

const RenderUser = ({
                      name = '',
                      // commonProjectsInfo = {},
                      projects = [],
                      rate = 0,
                      projectSalary = 0,
                      selectedDate = {},
                      total_expenses,
                      total_overtimes,
                      total_salary,
                      userId,
                      roleUser,
                      setEditUserId,
                      setIsOpenEdit,
                      comment,
                      total_uah,
                      is_processed,
                      setProcessedStatus,
                      isFetchingReports
                    }) => {

  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const handlerOpenMoreProject = (e) => {
    if (e.target.type === 'checkbox') {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
    dispatch(getUsersProjectReport(userId))
  }

  // const totalHoursOvertime = projects.reduce((sum, project) => {
  //   if (!project.is_full_time) {
  //     return (sum = sum + project.working_time)
  //   }
  //   return sum
  // }, 0)
  const totalHoursOvertime = 0;

  return (
    <div className="table_body_item">
      <TableRow
        // project={commonProjectsInfo}
        projectSalary={projectSalary}
        name={name}
        rate={rate}
        onClick={handlerOpenMoreProject}
        extraClass={'common'}
        total_expenses={total_expenses}
        total_overtimes={total_overtimes}
        total_salary={total_salary}
        totalHoursOvertime={totalHoursOvertime}
        roleUser={roleUser}
        userId={userId}
        setEditUserId={setEditUserId}
        setIsOpenEdit={setIsOpenEdit}
        comment={comment}
        total_uah={total_uah}
        is_processed={is_processed}
        setProcessedStatus={setProcessedStatus}
        selectedDate={selectedDate}
        isOpen={isOpen}
        isFetchingReports={isFetchingReports}
      />
      {/*{projects.map((project) => {*/}
      {/*  return (*/}
      {/*    <TableRow*/}
      {/*      project={project}*/}
      {/*      extraClass={isOpen ? 'more_project open' : 'more_project'}*/}
      {/*      rate={rate}*/}
      {/*      key={project.id}*/}
      {/*      selectedDate={selectedDate}*/}
      {/*      is_full_time={project.is_full_time}*/}
      {/*      userId={userId}*/}
      {/*      roleUser={roleUser}*/}
      {/*    />*/}
      {/*  )*/}
      {/*})}*/}
    </div>
  )
}


export  default RenderUser;