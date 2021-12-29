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
import { getIsFetchingProjectsReport, getProjectsList } from '../../selectors/developer-projects'
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

  const roleUser = useEqualSelector(getRoleUser);
  const profileId = useEqualSelector(getProfileId);
  const selectedDate = useEqualSelector(getSelectedMonthSelector);
  const projectsReports = useEqualSelector(getDevProjectConsolidateProjectReportsSelector);
  const developersList = useEqualSelector(getDevelopersSelector);
  const projectList = useEqualSelector(getProjectInTimeReportSelector);
  const selectedDeveloper = useEqualSelector(getSelectDeveloperInProjectReportSelector);
  const selectedProject = useEqualSelector(getSelectedProjectSelector);
  const editingUserId = useEqualSelector(getEditingUserIdSelector);
  const isFetchingReports = useEqualSelector(getIsFetchingProjectsReport);
  const selectedReports = useEqualSelector(selectUsersReports);

  const {total_usd, total_uah, exchange_rate} = projectsReports
  const users = selectedReports;

  const [columns, setColumns] = useState(initialColumns);
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [rows, setRows] = useState([]);
  const allDevelopers = useSelector(getDevelopersList);
  const allProjects = useSelector(getProjectsList);
  const errorStatus = useSelector(getProjectReportError, shallowEqual);

  const handlerChangeProcessedStatusInput = (userId) => (e) => {
    if (isFetchingReports) {
      return;
    }
    e.stopPropagation()

    const proceedStatus = {
      id: userId, month: selectedDate.month + 1, year: selectedDate.year,
    };

    dispatch(setProcessedStatus(proceedStatus));
  };

  const handlerCloseModalEdit = () => {
    dispatch(setEditUserId(''));
    setIsOpenEdit(false)
  };

  const handleChangeData = (data) => {
    const {month, year} = data;
    dispatch(changeSelectedDateProjectsReport(data));
    const ratesParams = {
      year, month: month + 1, is_active: true
    }
    dispatch(getRatesList(ratesParams));

  };

  const errorProjectReport = useMemo(() => {
    if (errorStatus) {
      return <p className='table_body_container_text'>{errorStatus.status} {errorStatus.text}</p>
    } else {
      return <p className='table_body_container_text'> There are no users in this project yet</p>
    }
  }, [errorStatus]);

  const handleOnSelect = useCallback((selector) => (data) => {
    dispatch(selector(data));
  }, [dispatch]);

  const handleRowClick = (userId) => (e) => {
    if (e.target.type === 'checkbox') {
      return
    }

    e.stopPropagation()

    if (roleUser === ADMIN || roleUser === ACCOUNTANT) {
      dispatch(setEditUserId(userId));
      setIsOpenEdit(true);
    }
  }

  const CustomTableRow = ({row, ...restProps}) => (
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
                         total_hours
                     }) => ({
      name,
      developer_projects,
      salary_uah: `${digitFormat.format(salary_uah)} ${salaryCurrency}`,
      rate_uah: `${digitFormat.format(rate_uah)} ${rateCurrency}`,
      totalHours: is_full_time ? 'fulltime' : `${total_hours || 0} `,
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
      dispatch(getDevelopersProjectInProjectReport());
    }
    dispatch(getConsolidateProjectReport());
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
            onSelected={handleOnSelect(setSelectedProjectInProjectReports)}
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
            onSelected={handleOnSelect(setSelectedDeveloper)}
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

      {roleUser !== DEVELOPER && roleUser !== PM && (<TotalValue
        totalUsd={total_usd}
        totalUah={total_uah}
        setExchangeRates={handleOnSelect(setExchangeRates)}
        prevExchangeRate={exchange_rate}
        selectedDate={selectedDate}
      />)}
      {roleUser !== DEVELOPER && roleUser !== PM && (<ActualRates/>)}

      {roleUser === PM && (
        <div
          key="Second Grid Element"
          className="card mt-5 mb-5"
        >
          <Grid
            rows={rows.filter(item => item.id === profileId)}
            columns={
              initialColumns.filter((column) => !roleRestrictions[DEVELOPER].includes(column.name))
            }
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
              rowComponent={CustomTableRow}
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
            <TableRowDetail contentComponent={ProjectReportRowDetail}/>
          </Grid>
        </div>

      )}

      <div
        key="First Grid Element"
        className="card mt-5 mb-5"
      >
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
            rowComponent={CustomTableRow}
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
          <TableRowDetail contentComponent={ProjectReportRowDetail}/>
        </Grid>
      </div>
    </div>
  </>);
}

export default ProjectsReport;
