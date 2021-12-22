import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import TableHeader from './components/TableHeader'
import Select from 'components/ui/select'
import SelectMonth from 'components/ui/select-month'
import EditUserModal from './components/EditUserModal'
import TotalValue from './components/TotalValue'
import './style.scss'
import { getRoleUser } from 'selectors/user'
import { DEVELOPER, PM } from 'constants/role-constant'
import { getProjectReportError } from 'selectors/project-report'
import {
  changeSelectedDateProjectsReport,
  setSelectedDeveloper,
  setSelectedProjectInProjectReports,
  getDevelopersProjectInProjectReport,
  setEditUserId,
  setExchangeRates,
  getConsolidateProjectReport,
} from 'actions/projects-report'
import { setProcessedStatus } from 'actions/users'
import {
  getSelectedProjectSelector,
  getSelectedMonthSelector,
  getSelectDeveloperInProjectReportSelector,
  getDevProjectConsolidateProjectReportsSelector,
  selectUsersReports
} from 'reducers/projects-report'
import { getDevelopersList } from '../../selectors/developers'
import { getIsFetchingProjectsReport, getProjectsList } from '../../selectors/developer-projects'
import Spinner from '../ui/spinner'
import ActualRates from '../ui/actual-rates/ActualRates'
import { getRatesList } from '../../actions/currency'
import RenderUser from './components/RenderUser'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { getProfileId } from 'selectors/user'

function ProjectsReport() {

  const [userRolePM, setUserRolePM] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const dispatch = useDispatch()

  const roleUser = useEqualSelector(getRoleUser)
  const selectedDate = useEqualSelector(getSelectedMonthSelector)
  const projectsReports = useEqualSelector(getDevProjectConsolidateProjectReportsSelector)
  const selectedDeveloper = useEqualSelector(getSelectDeveloperInProjectReportSelector)
  const selectedProject = useEqualSelector(getSelectedProjectSelector)
  const isFetchingReports = useEqualSelector(getIsFetchingProjectsReport)
  const selectUsersReport = useEqualSelector(selectUsersReports)
  const allDevelopers = useEqualSelector(getDevelopersList)
  const allProjects = useEqualSelector(getProjectsList)
  const errorStatus = useEqualSelector(getProjectReportError)
  const currentUserId = useEqualSelector(getProfileId)

  const { total_usd, total_uah, exchange_rate } = projectsReports
  const users = selectUsersReport
  const scrollClassName = roleUser === PM ? 'overflow-hidden' : '';
  const currentUser = users.find((users) => {return (users.id === currentUserId)})

  const handlerCloseModalEdit = () => {
    dispatch(setEditUserId(''))
    setIsOpenEdit(false)
  }

  const handleChangeData = (data) => {
    const { month, year } = data;
    dispatch(changeSelectedDateProjectsReport(data))
    const ratesParams = {
      year,
      month: month + 1,
      is_active: true
    }
    dispatch(getRatesList(ratesParams))
  }

  const errorProjectReport = useMemo(()=>{
    if (errorStatus){
      return <p className='table_body_container_text'>{errorStatus.status} {errorStatus.text}</p>
    } else {
      return <p className='table_body_container_text'> There are no users in this project yet</p>
    }
  }, [errorStatus])

  const onSetSelectedDeveloper = useCallback((data)=>{
    dispatch(setSelectedDeveloper(data))
  }, [dispatch, setSelectedDeveloper])

  const onSelectedProjectInProjectReports = useCallback((data)=>{
    dispatch(setSelectedProjectInProjectReports(data))
  }, [dispatch, setSelectedProjectInProjectReports])

  const onSetEditUserId = useCallback((data)=>{
    dispatch(setEditUserId(data))
  }, [dispatch, setEditUserId])

  const onSetExchangeRates = useCallback((data)=>{
    dispatch(setExchangeRates(data))
  }, [dispatch, setExchangeRates])

  const onSetProcessedStatus = useCallback((data)=>{
    dispatch(setProcessedStatus(data))
  }, [dispatch, setProcessedStatus])

    useEffect(() => {
    if (roleUser !== DEVELOPER) {
      dispatch(getDevelopersProjectInProjectReport())
    }
    if (roleUser === PM) {
      setUserRolePM(true)
    } else {
      setUserRolePM(false)
    }
    dispatch(getConsolidateProjectReport())
  }, [])

  const renderUser = () => {
    if(currentUser) {
      const allProjectsName = '';
      const commonProjectsInfo = {
        name: allProjectsName,
      }

      return (
        <RenderUser
          commonProjectsInfo={commonProjectsInfo}
          projects={currentUser.developer_projects}
          name={currentUser.name}
          // rate={current_rate}
          rate={currentUser.rate_uah}
          // projectSalary={current_salary}
          projectSalary={currentUser.salary_uah}
          salaryCurrency={currentUser.salaryCurrency}
          rateCurrency={currentUser.rateCurrency}
          totalHoursOvertime={currentUser.totalHoursOvertime}
          key={currentUser.id}
          userId={currentUser.id}
          selectedDate={currentUser.selectedDate}
          total_expenses={currentUser.total_expenses}
          total_overtimes={currentUser.total_overtimes}
          total_salary={currentUser.total_salary}
          roleUser={roleUser}
          setEditUserId={onSetEditUserId}
          setIsOpenEdit={setIsOpenEdit}
          comment={currentUser.comments}
          total_uah={total_uah}
          is_processed={currentUser.is_processed}
          setProcessedStatus={onSetProcessedStatus}
          isFetchingReports={isFetchingReports}
          userRolePM
        />
      )
    }
  }

  return (
    <>
      {isFetchingReports && <Spinner />}
    <div className="container project_report_container">
      {isOpenEdit && (
        <EditUserModal handlerCloseModalEdit={handlerCloseModalEdit} />
      )}
      <div className="project_report_header_container">
        {roleUser !== DEVELOPER && roleUser !== PM && (
          <div className="project_report_header_choice">
            <Select
              title="choose your project..."
              extraClassContainer="project_select_container"
              listItems={allProjects}
              valueKey="name"
              idKey="id"
              isSearch={true}
              onSelected={onSelectedProjectInProjectReports}
              disabled={
                selectedDeveloper.name !== 'All Developers' ? true : false
              }
              initialChoice={selectedProject}

            />
            <Select
              title="choose developer..."
              extraClassContainer="developer_select_container"
              listItems={allDevelopers}
              valueKey="name"
              idKey="id"
              isSearch={true}
              onSelected={onSetSelectedDeveloper}
              disabled={selectedProject.name !== 'All Projects' ? true : false}
              initialChoice={selectedDeveloper}
            />
          </div>
        )}
        <SelectMonth
          selectedDate={selectedDate}
          setNewData={handleChangeData}
        />
      </div>

      {roleUser !== DEVELOPER && roleUser !== PM && (
        <TotalValue
          totalUsd={total_usd}
          totalUah={total_uah}
          setExchangeRates={onSetExchangeRates}
          prevExchangeRate={exchange_rate}
          selectedDate={selectedDate}
        />
      )}
      {roleUser !== DEVELOPER && roleUser !== PM && (
        <ActualRates />
      )}
      { userRolePM && (
          <div className={`table_container ${scrollClassName}`}>
          <div className="table_scroll">
            <TableHeader roleUser={roleUser} userRolePM/>
            <div className="table_body_container">
              {!!currentUser &&
              (renderUser()) 
              }
              {!currentUser && 
              
                <>
                  {!isFetchingReports &&
                    errorProjectReport
                  }
                </>
              }  
            </div>
          </div>
        </div>
      )}

      <div className={`table_container ${scrollClassName}`}>
        <div className="table_scroll">
          <TableHeader roleUser={roleUser} />
          <div className="table_body_container">
            {!!users?.length ?
              (
                <>
                {users.map((user) => {
                  const {
                    name,
                    developer_projects,
                    // current_rate,
                    rate_uah,
                    // current_salary,
                    salary_uah,
                    salaryCurrency,
                    rateCurrency,
                    id,
                    total_expenses,
                    total_overtimes,
                    total: total_salary,
                    comments,
                    total_uah,
                    is_processed,
                    totalHoursOvertime
                  } = user

                  const allProjectsName = '';
                  const commonProjectsInfo = {
                    name: allProjectsName,
                  }

                  return (
                    <RenderUser
                      commonProjectsInfo={commonProjectsInfo}
                      projects={developer_projects}
                      name={name}
                      rate={rate_uah}
                      projectSalary={salary_uah}
                      salaryCurrency={salaryCurrency}
                      rateCurrency={rateCurrency}
                      totalHoursOvertime={totalHoursOvertime}
                      key={id}
                      userId={id}
                      selectedDate={selectedDate}
                      total_expenses={total_expenses}
                      total_overtimes={total_overtimes}
                      total_salary={total_salary}
                      roleUser={roleUser}
                      setEditUserId={onSetEditUserId}
                      setIsOpenEdit={setIsOpenEdit}
                      comment={comments}
                      total_uah={total_uah}
                      is_processed={is_processed}
                      setProcessedStatus={onSetProcessedStatus}
                      isFetchingReports={isFetchingReports}
                    />
                  )
                })}
                </>):
              (
                <>
                  {!isFetchingReports &&
                  errorProjectReport
                  }
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProjectsReport
