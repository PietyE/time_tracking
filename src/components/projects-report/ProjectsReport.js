import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import TableHeader from './components/TableHeader'
import Select from 'components/ui/select'
import SelectMonth from 'components/ui/select-month'
import EditUserModal from './components/EditUserModal'
import TotalValue from './components/TotalValue'
import { getRoleUser } from 'selectors/user'
import { getDevelopersSelector } from 'selectors/developers'
import { ACCOUNTANT, ADMIN, DEVELOPER, PM } from 'constants/role-constant'
import { getProjectReportError } from 'selectors/project-report'
import {
  changeSelectedDateProjectsReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
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
import { getIsFetchingProjectsReport, getProjectsList } from '../../selectors/developer-projects'
import Spinner from '../ui/spinner'
import ActualRates from '../ui/actual-rates/ActualRates'
import { getRatesList } from '../../actions/currency'
import RenderUser from './components/RenderUser'
import { convertMinutesToHours, digitFormat, getSortedUsers, UAHFormat } from '../../utils/common'
import { Grid, Table, TableHeaderRow, TableRowDetail } from '@devexpress/dx-react-grid-bootstrap4'
import { IntegratedSorting, RowDetailState, SortingState } from '@devexpress/dx-react-grid'
import RowDetail from '../project-management/components/RowDetail'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import CustomCell from './components/CustomCell'
import CustomHeaderCell from './components/CustomHeaderCell'

const roleRestrictions = {
  [DEVELOPER]: ['comments', 'is_processed',],
  [PM]: ['salary_uah', 'rate_uah', 'total_overtimes', 'total', 'total_expenses', 'total_uah', 'is_processed',],
}
const initialColumns = [{name: 'name', title: 'Name'}, {
  name: 'developer_projects',
  title: 'Projects'
}, {name: 'salary_uah', title: 'Salary'}, {name: 'rate_uah', title: 'Rate'}, {
  name: 'totalHoursOvertime',
  title: 'Hours'
}, {name: 'total_overtimes', title: 'Overtime\n salary,\n total'}, {
  name: 'total',
  title: 'Total salary'
}, {name: 'total_expenses', title: 'Extra costs, UAH'}, {
  name: 'total_uah',
  title: 'Total to pay, UAH'
}, {name: 'comments', title: 'Comments'}, {name: 'is_processed', title: 'Payed'},];

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
  const {total_usd, total_uah, exchange_rate} = projectsReports
  const users = selectUsersReports;
  const scrollClassName = roleUser === PM ? 'overflow-hidden' : '';

  const [columns, setColumns] = useState(initialColumns);
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [sortField, setSortField] = useState({
    key: null, order: null,
  });
  const [rows, setRows] = useState([]);
  const allDevelopers = useSelector(getDevelopersList);
  const allProjects = useSelector(getProjectsList);
  const errorStatus = useSelector(getProjectReportError, shallowEqual);

  const handlerChangeProcessedStatusInput = (userId) => (e) => {
    if (isFetchingReports) {
      return;
    }
    e.stopPropagation()
    setProcessedStatus({
      id: userId, month: selectedDate.month + 1, year: selectedDate.year,
    })
  };

  const handlerCloseModalEdit = () => {
    setEditUserId('')
    setIsOpenEdit(false)
  };

  const handleChangeData = (data) => {
    const {month, year} = data;
    changeSelectedDateProjectsReport(data)
    const ratesParams = {
      year, month: month + 1, is_active: true
    }
    getRatesList(ratesParams)

  };

  const handleSortPress = useCallback((data) => {
    setSortField(data);
  }, []);


  const errorProjectReport = useMemo(() => {
    if (errorStatus) {
      return <p className='table_body_container_text'>{errorStatus.status} {errorStatus.text}</p>
    } else {
      return <p className='table_body_container_text'> There are no users in this project yet</p>
    }
  }, [errorStatus]);

  const sortedUsers = useMemo(
    () => getSortedUsers(users, sortField.key, sortField.order),
    [sortField.key, sortField.order, users.length],
  );

  const handleRowClick = (userId) => (e) => {
    if (e.target.type === 'checkbox') {
      return
    }

    e.stopPropagation()

    if (roleUser === ADMIN || roleUser === ACCOUNTANT) {
      setEditUserId(userId)
      setIsOpenEdit(true)
    }
  }

  const TableRow = ({row, ...restProps}) => (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={handleRowClick(row.id)}
    />
  );

  const formatedUsers = useMemo(
    () => users.map(({
                       name,
                       developer_projects,
                       salary_uah,
                       rate_uah,
                       totalHoursOvertime,
                       total_overtimes,
                       total,
                       total_expenses,
                       total_uah,
                       comments,
                       is_processed,
                       id,
                       salaryCurrency,
                       rateCurrency,
                       is_full_time,
                     }) => ({
      name,
      developer_projects,
      salary_uah: `${digitFormat.format(salary_uah)} ${salaryCurrency}`,
      rate_uah: `${digitFormat.format(rate_uah)} ${rateCurrency}`,
      totalHoursOvertime: is_full_time ? 'fulltime' : `${totalHoursOvertime || 0} `,
      total_overtimes: UAHFormat.format(total_overtimes || total),
      total: UAHFormat.format(total),
      total_expenses: UAHFormat.format(total_expenses),
      total_uah: UAHFormat.format(total_uah),
      comments: (comments ? (<OverlayTrigger
        placement="left"
        containerPadding={20}
        trigger={['focus', 'hover']}
        key={id}
        overlay={<Popover id="popover-basic">
          <Popover.Title as="h3">Comment</Popover.Title>
          <Popover.Content>{comments}</Popover.Content>
        </Popover>}
      >
        <FontAwesomeIcon icon={faComments}/>
      </OverlayTrigger>) : ('')),
      is_processed: (<span className="table_cell ready">
          <input
            type="checkbox"
            checked={is_processed}
            onChange={handlerChangeProcessedStatusInput(id)}
          />
        </span>),
      id,
    })),
    [users]);

  useEffect(() => {
    if (roleUser && roleRestrictions?.[roleUser]) {
      const filteredColumns = initialColumns.filter((column) => !roleRestrictions[roleUser].includes(column.name),);

      setColumns(filteredColumns);
    }
  }, [roleUser]);

  useEffect(() => {
    setRows(formatedUsers)
  }, [formatedUsers]);

  useEffect(() => {
    if (roleUser !== DEVELOPER) {
      getDevelopersProjectInProjectReport()
    }
    getConsolidateProjectReport()
  }, [roleUser]);

  return (<>
    {isFetchingReports && <Spinner/>}
    <div className="container project_report_container">
      {isOpenEdit && (<EditUserModal handlerCloseModalEdit={handlerCloseModalEdit}/>)}
      <div className="project_report_header_container">
        {roleUser !== DEVELOPER && roleUser !== PM && (<div className="project_report_header_choice">
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
            disabled={selectedDeveloper.name !== 'All Developers' ? true : false}
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
        </div>)}
        <SelectMonth
          selectedDate={selectedDate}
          setNewData={handleChangeData}
        />
      </div>

      {roleUser !== ACCOUNTANT && roleUser !== PM && (<TotalValue
        totalUsd={total_usd}
        totalUah={total_uah}
        setExchangeRates={setExchangeRates}
        prevExchangeRate={exchange_rate}
        selectedDate={selectedDate}
      />)}
      {roleUser !== DEVELOPER && roleUser !== PM && (<ActualRates/>)}

      <div className="card mt-5 mb-5">
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            defaultSorting={[{columnName: 'name', direction: 'asc'},]}
          />

          <IntegratedSorting/>

          <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={setExpandedRowIds}
            defaultExpandedRowIds={[]}
          />
          <Table
            rowComponent={TableRow}
            cellComponent={CustomCell}
            messages={{
              noData: isFetchingReports ? '' : 'There are no active projects to display.',
            }}
          />
          <TableHeaderRow
            resizingEnabled
            tableColumnResizingEnabled
            showSortingControls={true}
            cellComponent={CustomHeaderCell}
          />
          <TableRowDetail contentComponent={RowDetail}/>
        </Grid>
      </div>

      {/*<div className={`table_container ${scrollClassName}`}>*/}
      {/*  <div className="table_scroll">*/}
      {/*    <TableHeader*/}
      {/*      roleUser={roleUser}*/}
      {/*      onSortPress={handleSortPress}*/}
      {/*    />*/}
      {/*    <div className="table_body_container">*/}
      {/*      {users?.length ?*/}
      {/*        (*/}
      {/*          <>*/}
      {/*          {sortedUsers.map((user) => {*/}
      {/*            const {*/}
      {/*              name,*/}
      {/*              developer_projects,*/}
      {/*              // current_rate,*/}
      {/*              rate_uah,*/}
      {/*              // current_salary,*/}
      {/*              salary_uah,*/}
      {/*              salaryCurrency,*/}
      {/*              rateCurrency,*/}
      {/*              id,*/}
      {/*              total_expenses,*/}
      {/*              total_overtimes,*/}
      {/*              total: total_salary,*/}
      {/*              comments,*/}
      {/*              total_uah,*/}
      {/*              is_processed,*/}
      {/*              totalHoursOvertime*/}
      {/*            } = user*/}

      {/*            // const allProjectsName = developer_projects*/}
      {/*            //   .map((project) => project.name)*/}
      {/*            //   .join(', ')*/}
      {/*            const allProjectsName = '';*/}
      {/*            const commonProjectsInfo = {*/}
      {/*              name: allProjectsName,*/}
      {/*            }*/}

      {/*            return (*/}
      {/*              <RenderUser*/}
      {/*                commonProjectsInfo={commonProjectsInfo}*/}
      {/*                projects={developer_projects}*/}
      {/*                name={name}*/}
      {/*                // rate={current_rate}*/}
      {/*                rate={rate_uah}*/}
      {/*                // projectSalary={current_salary}*/}
      {/*                projectSalary={salary_uah}*/}
      {/*                salaryCurrency={salaryCurrency}*/}
      {/*                rateCurrency={rateCurrency}*/}
      {/*                totalHoursOvertime={totalHoursOvertime}*/}
      {/*                key={id}*/}
      {/*                userId={id}*/}
      {/*                selectedDate={selectedDate}*/}
      {/*                total_expenses={total_expenses}*/}
      {/*                total_overtimes={total_overtimes}*/}
      {/*                total_salary={total_salary}*/}
      {/*                roleUser={roleUser}*/}
      {/*                setEditUserId={setEditUserId}*/}
      {/*                setIsOpenEdit={setIsOpenEdit}*/}
      {/*                comment={comments}*/}
      {/*                total_uah={total_uah}*/}
      {/*                is_processed={is_processed}*/}
      {/*                setProcessedStatus={setProcessedStatus}*/}
      {/*                isFetchingReports={isFetchingReports}*/}
      {/*              />*/}
      {/*            )*/}
      {/*          })}*/}
      {/*          </>):*/}
      {/*        (*/}
      {/*          <>*/}
      {/*            {!isFetchingReports &&*/}
      {/*            errorProjectReport*/}
      {/*            }*/}
      {/*          </>*/}
      {/*        )*/}
      {/*      }*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  </>);
}

const mapStateToProps = (state) => ({
  roleUser: getRoleUser(state),
  selectedDate: getSelectedMonthSelector(state),
  projectsReports: getDevProjectConsolidateProjectReportsSelector(state),
  developersList: getDevelopersSelector(state),
  projectList: getProjectInTimeReportSelector(state),
  selectedDeveloper: getSelectDeveloperInProjectReportSelector(state),
  selectedProject: getSelectedProjectSelector(state),
  editingUserId: getEditingUserIdSelector(state),
  isFetchingReports: getIsFetchingProjectsReport(state),
  selectUsersReports: selectUsersReports(state),
})

const actions = {
  changeSelectedDateProjectsReport,
  setSelectedDeveloper,
  clearDeveloperSelected,
  setSelectedProjectInProjectReports,
  clearSelectedProjectInProjectReports,
  getDevelopersProjectInProjectReport,
  setEditUserId,
  setExchangeRates,
  setProcessedStatus,
  getConsolidateProjectReport,
  getRatesList,
};

export default connect(mapStateToProps, actions)(ProjectsReport);
