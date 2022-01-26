import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'components/ui/select'
import SelectMonth from 'components/ui/select-month'
import EditUserModal from './components/EditUserModal'
// import TotalValue from './components/TotalValue'
import { getProfileId, getRoleUser } from 'selectors/user'
import { ACCOUNTANT, ADMIN, DEVELOPER, PM } from 'constants/role-constant'
import {
  changeSelectedDateProjectsReport,
  setSelectedDeveloper,
  setSelectedProjectInProjectReports,
  getDevelopersProjectInProjectReport,
  setEditUserId,
  // setExchangeRates,
  getConsolidateProjectReport,
} from 'actions/projects-report'
import {
  getSelectedProjectSelector,
  getSelectedMonthSelector,
  getSelectDeveloperInProjectReportSelector,
  // getDevProjectConsolidateProjectReportsSelector,
  selectUsersReports,
} from 'reducers/projects-report'
import { getDevelopersList } from '../../selectors/developers'
import { getIsFetchingProjectsReport, getProjectsList } from '../../selectors/developer-projects'
import Spinner from '../ui/spinner'
// import ActualRates from '../ui/actual-rates/ActualRates'
import { getRatesList } from '../../actions/currency'
import {
  compareForTimeColumns,
} from '../../utils/common'
import { Grid, Table, TableHeaderRow, TableRowDetail } from '@devexpress/dx-react-grid-bootstrap4'
import { IntegratedSorting, RowDetailState, SortingState } from '@devexpress/dx-react-grid'
import './style.scss'
import CustomCell from './components/CustomCell'
import CustomHeaderCell from './components/CustomHeaderCell'
import { columnExtensions, initialColumns } from './projectReportConfig'
import ProjectReportRowDetail from './components/ProjectReportRowDetail'
import useEqualSelector from '../../custom-hook/useEqualSelector'
import useWindowDimensions from '../../custom-hook/useWIndowDimensions'
import useSorting from '../../custom-hook/useSorting'

function ProjectsReport() {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const roleUser = useEqualSelector(getRoleUser);
  const profileId = useEqualSelector(getProfileId);
  const selectedDate = useEqualSelector(getSelectedMonthSelector);
  // const projectsReports = useEqualSelector(getDevProjectConsolidateProjectReportsSelector);
  const selectedDeveloper = useEqualSelector(getSelectDeveloperInProjectReportSelector);
  const selectedProject = useEqualSelector(getSelectedProjectSelector);
  const isFetchingReports = useEqualSelector(getIsFetchingProjectsReport);
  const selectedReports = useEqualSelector(selectUsersReports);

  // const { total_usd, total_uah, exchange_rate } = projectsReports
  const users = selectedReports;
  const isScrollTable = width < 900;

  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [expandedRowIdForPm, setExpandedRowIdsForPm] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [rows, setRows] = useState([]);
  const allDevelopers = useSelector(getDevelopersList);
  const allProjects = useSelector(getProjectsList);
  const { sorting, handleSortingChange } = useSorting();

  const handlerCloseModalEdit = () => {
    dispatch(setEditUserId(''));
    setIsOpenEdit(false)
  };

  const handleChangeData = (data) => {
    const { month, year } = data;
    dispatch(changeSelectedDateProjectsReport(data));
    const ratesParams = {
      year, month: month + 1, is_active: true
    }
    dispatch(getRatesList(ratesParams));

  };

  // const errorProjectReport = useMemo(() => {
  //   if (errorStatus) {
  //     return <p className='table_body_container_text'>{errorStatus.status} {errorStatus.text}</p>
  //   } else {
  //     return <p className='table_body_container_text'> There are no users in this project yet</p>
  //   }
  // }, [errorStatus]);

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

  const formattedUsers = useMemo(
    () => users.map(({
      name,
      developer_projects,
      id,
      is_full_time,
      total_hours
    }) => ({
      name,
      developer_projects,
      totalHours: is_full_time ? 'fulltime' : `${total_hours || 0} `,
      active_project: true,
      id,
    })),
    [users]);

  useEffect(() => {
    setRows(formattedUsers)
  }, [formattedUsers]);

  useEffect(() =>{
    if (roleUser) {
      if (roleUser !== DEVELOPER) {
        dispatch(getDevelopersProjectInProjectReport());
      }
      dispatch(getConsolidateProjectReport());
    }

  }, [roleUser, dispatch]);

  return (<>
    {isFetchingReports && <Spinner />}
    <div className="container project_report_container">
      {/* {isOpenEdit && (<EditUserModal handlerCloseModalEdit={handlerCloseModalEdit}/>)} */}
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
            disabled={selectedDeveloper.name !== 'All Developers'}
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
            disabled={selectedProject.name !== 'All Projects'}
            initialChoice={selectedDeveloper}
          />
        </div>)}
        <SelectMonth
          selectedDate={selectedDate}
          setNewData={handleChangeData}
        />
      </div>

      {/* {  roleUser !== PM && roleUser && roleUser !== DEVELOPER  && (<TotalValue
        totalUsd={total_usd}
        totalUah={total_uah}
        setExchangeRates={handleOnSelect(setExchangeRates)}
        prevExchangeRate={exchange_rate}
        selectedDate={selectedDate}
      />)}
      {roleUser !== DEVELOPER && roleUser !== PM && (<ActualRates/>)} */}

      {roleUser === PM && (
        <div
          key="Second Grid Element"
          className="card mb-5"
        >
          <Grid
            rows={rows.filter(item => item.id === profileId)}
            columns={initialColumns}
          >
            <RowDetailState
              expandedRowIds={expandedRowIdForPm}
              onExpandedRowIdsChange={setExpandedRowIdsForPm}
              defaultExpandedRowIds={[]}
            />
            <Table
              columnExtensions={!isScrollTable && columnExtensions}
              rowComponent={CustomTableRow}
              cellComponent={CustomCell}
              messages={{
                noData: isFetchingReports ? '' : 'There are no active projects to display.',
              }}
            />
            <TableHeaderRow cellComponent={CustomHeaderCell}
            />
            <TableRowDetail
              contentComponent={
                (props) => <ProjectReportRowDetail {...props} pmDetailed />
              }
            />
          </Grid>
        </div>

      )}

      <div
        key="First Grid Element"
        className="card mb-5"
      >
        <Grid
          rows={rows}
          columns={initialColumns}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={handleSortingChange}
            columnExtensions={[
              { columnName: 'developer_projects', sortingEnabled: false },
            ]}

          />

          <IntegratedSorting
            columnExtensions={[
              { columnName: 'totalHours', compare: compareForTimeColumns },
            ]}
          />

          <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={setExpandedRowIds}
            defaultExpandedRowIds={[]}
          />
          <Table
            columnExtensions={!isScrollTable && columnExtensions}
            rowComponent={CustomTableRow}
            cellComponent={CustomCell}
            messages={{
              noData: isFetchingReports ? '' : 'There are no active projects to display.',
            }}
          />
          <TableHeaderRow
            showSortingControls={roleUser !== DEVELOPER}
            cellComponent={CustomHeaderCell}
          />
          <TableRowDetail contentComponent={ProjectReportRowDetail} />
        </Grid>
      </div>
    </div>
  </>);
}

export default ProjectsReport;
