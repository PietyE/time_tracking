import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Select from 'components/ui/select'
import SelectMonth from 'components/ui/select-month'
import EditUserModal from './components/EditUserModal'
import TotalValue from './components/TotalValue'
import { getProfileId, getRoleUser } from 'selectors/user'
import { getDevelopersSelector } from 'selectors/developers'
import { ACCOUNTANT, ADMIN, DEVELOPER, PM } from 'constants/role-constant'
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
  getProjectInTimeReportSelector,
  getSelectedProjectSelector,
  getEditingUserIdSelector,
  getSelectedMonthSelector,
  getSelectDeveloperInProjectReportSelector,
  getDevProjectConsolidateProjectReportsSelector,
  selectUsersReports,

} from 'reducers/projects-report'
import { getDevelopersList } from '../../selectors/developers'
import {
  getIsFetchingProjectsReport,
  getProjectsList,
} from '../../selectors/developer-projects'
import Spinner from '../ui/spinner'
import ActualRates from '../ui/actual-rates/ActualRates'
import { getRatesList } from '../../actions/currency'
import { digitFormat, UAHFormat } from '../../utils/common'
import { Grid, Table, TableHeaderRow, TableRowDetail } from '@devexpress/dx-react-grid-bootstrap4'
import { IntegratedSorting, RowDetailState, SortingState } from '@devexpress/dx-react-grid'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import CustomCell from './components/CustomCell'
import CustomHeaderCell from './components/CustomHeaderCell'
import { initialColumns, roleRestrictions } from './projectReportConfig'
import ProjectReportRowDetail from './components/ProjectReportRowDetail'
import useEqualSelector from '../../custom-hook/useEqualSelector'

function ProjectsReport() {
  const dispatch = useDispatch();

function ProjectsReport({
  roleUser,
  selectedDate,
  changeSelectedDateProjectsReport,
  projectsReports,
  developersList = [],
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  projectList = [],
  selectedDeveloper = {},
  getDevelopersProjectInProjectReport,
  selectedProject = {},
  setEditUserId,
  setExchangeRates,
  setProcessedStatus,
  isFetchingReports,
  getConsolidateProjectReport,
  selectUsersReports,
  getRatesList,
}) {
  const { total_usd, total_uah, exchange_rate } = projectsReports
  const users = selectUsersReports
  const scrollClassName = roleUser === PM ? 'overflow-hidden' : '';

    dispatch(setProcessedStatus(proceedStatus));
  };

  const handlerCloseModalEdit = () => {
    dispatch(setEditUserId(''));
    setIsOpenEdit(false)
  };

  const handleChangeData = (data) => {
    const {month, year} = data
    dispatch(changeSelectedDateProjectsReport(data));
    const ratesParams = {
      year, month: month + 1, is_active: true,
    }
    dispatch(getRatesList(ratesParams)
  );

  };

  const errorProjectReport = useMemo(() => {
    if (errorStatus) {
      return (
        <p className="table_body_container_text">
          {errorStatus.status} {errorStatus.text}
        </p>
      )
    } else {
      return (
        <p className="table_body_container_text">
          {' '}
          There are no users in this project yet
        </p>
      )
    }
  }, [errorStatus])
  
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
              onSelected={setSelectedProjectInProjectReports}
              // onClear={clearSelectedProjectInProjectReports}
              // disabled={!_.isEmpty(selectedDeveloper)}
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
              onSelected={setSelectedDeveloper}
              // disabled={!_.isEmpty(selectedProject)}
              // onClear={clearDeveloperSelected}
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
          setExchangeRates={setExchangeRates}
          prevExchangeRate={exchange_rate}
          selectedDate={selectedDate}
        />
      )}
      {roleUser !== DEVELOPER && roleUser !== PM && (
        <ActualRates />
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

                  // const allProjectsName = developer_projects
                  //   .map((project) => project.name)
                  //   .join(', ')
                  const allProjectsName = '';
                  const commonProjectsInfo = {
                    name: allProjectsName,
                  }

                  return (
                    <RenderUser
                      commonProjectsInfo={commonProjectsInfo}
                      projects={developer_projects}
                      name={name}
                      // rate={current_rate}
                      rate={rate_uah}
                      // projectSalary={current_salary}
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
                      setEditUserId={setEditUserId}
                      setIsOpenEdit={setIsOpenEdit}
                      comment={comments}
                      total_uah={total_uah}
                      is_processed={is_processed}
                      setProcessedStatus={setProcessedStatus}
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

export default ProjectsReport;
