import React, { useCallback, useEffect, useState, useMemo } from 'react'
import SelectMonth from '../ui/select-month'
import {
  IntegratedSorting,
  RowDetailState,
  SortingState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4'
import { useDispatch } from 'react-redux'
import {
  getAllProjectsSelector,
  getSelectedDateForPMSelector,
  getSelectedMonthForPMSelector,
  getIsFetchingPmPageSelector,
  getIsShowEditModalSelector,
  getIsShowCreateModalSelector,
  getProjectManagerListSelector,
  getSelectedPmSelector, getShownProjectSelector, getFilteredProjectSelector,
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement, clearPmProjects,
  getAllProjects, setSelectedProjectId,
  downloadAllTeamProjectReport,
  setShowCreateModal, setShowEditModal,
  setPm, setShownProject, getProjectReportById,
} from '../../actions/projects-management'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
import EditProjectModal from './components/EditProjectModal'
import './style.scss'
import { Button } from 'react-bootstrap'
import SpinnerStyled from '../ui/spinner'
import Select from '../ui/select'
import { getCurrentUserSelector } from '../../reducers/profile'
import {isEmpty} from 'lodash'
import { compareForTimeColumns, convertMinutesToHours } from '../../utils/common'
import useEqualSelector from '../../custom-hook/useEqualSelector'

const ProjectManagementComponent =() => {
  const dispatch = useDispatch()
  const selectedDateForPM = useEqualSelector(getSelectedDateForPMSelector);
    const projects = useEqualSelector(getAllProjectsSelector);
    const isFetching = useEqualSelector(getIsFetchingPmPageSelector);
    const month = useEqualSelector(getSelectedMonthForPMSelector);
    const isEditModalShow = useEqualSelector(getIsShowEditModalSelector);
    const isCreateModalShow = useEqualSelector(getIsShowCreateModalSelector);
    const projectManagers = useEqualSelector(getProjectManagerListSelector);
    const selectedPm = useEqualSelector(getSelectedPmSelector);
    const currentPm = useEqualSelector(getCurrentUserSelector);
    const shownProject = useEqualSelector(getShownProjectSelector);
    const filteredProjects = useEqualSelector(getFilteredProjectSelector);

  useEffect(()=>{
    if(isEmpty(selectedPm)){
      dispatch(setPm(currentPm));
    }
  },[selectedPm, currentPm])

  const addSelectAll = useMemo(() => {
    if(projectManagers){
      return [
        {
          id: "select-all",
          name: "Select All"
        },
        ...projectManagers
      ]
    }
  }, [projectManagers])

  useEffect(()=>{
    dispatch(clearPmProjects());
    setExpandedRowIds([]);
    dispatch(getAllProjects());
  },[month])

    const [columns] = useState([
      { name: 'project', title: 'Project' },
      { name: 'occupancy', title: 'Occupancy' },
      { name: 'hours', title: 'Hours' },
      { name: 'report', title: 'Report' },
      { name: 'actions', title: 'Actions' },
    ])

    const _downloadAllTeamProjectReport = useCallback(
      (data) => {
        dispatch(downloadAllTeamProjectReport(data))
      },
      [dispatch],
    )
  const _getProjectReportById = useCallback(
    (data) => {
      dispatch(getProjectReportById(data))
    },
    [dispatch],
  )
    const _setSelectedProjectId = useCallback(
      (data) => {
        dispatch(setSelectedProjectId(data))
      },
      [dispatch],
    )
    const openEditModal = (id) => {
      _setSelectedProjectId(id)
      dispatch(setShowEditModal(true));
    }
  const [rows, setRows] = useState([])
  useEffect(() => {
        const reformatProjects = filteredProjects.map(project => ({
          project: project.name,
          occupancy: ' ',
          hours: convertMinutesToHours(project?.total_minutes),
          report: <Button variant = "outline-*" onClick = {() => _downloadAllTeamProjectReport(project.id)}>
            <span className = "oi oi-cloud-download"/>
          </Button>,
          actions: <span className = "oi oi-pencil" onClick = {() => openEditModal(project.id)}/>,
          id: project.id,
        }))
        setRows(reformatProjects)
    }, [filteredProjects, projects])

    const [expandedRowIds, setExpandedRowIds] = useState([])

  const onSelectPm = (data) => {
    dispatch(setPm(data));
    dispatch(setShownProject(null));
    setExpandedRowIds([]);
    dispatch(getAllProjects());
  }

  const clearSelectedProject = () => {
    dispatch(setShownProject(null));
  }
  const onSelectProject = (data) => {
    dispatch(setShownProject(data));
    _getProjectReportById(data.id);
  }

  return (
      <>
        {isFetching && <SpinnerStyled/>}
        <div className = "container project_management_container">
          <div className = "flex row justify-content-between">

            <Select
              title="choose project manager..."
              listItems={addSelectAll}
              onSelected={onSelectPm}
              valueKey="name"
              idKey="id"
              extraClassContainer={'developer_select pm_select'}
              onSelectAll="true"
              initialChoice={selectedPm || currentPm}
              isSearch
            />

            <Select
              title="choose project..."
              listItems = {projects}
              onSelected={onSelectProject}
              valueKey="name"
              idKey="id"
              extraClassContainer={'project_select project_select'}
              initialChoice={shownProject}
              onClear={clearSelectedProject}
              disabled={!projects?.length}
              isSearch
            />

            <SelectMonth
              extraClassNameContainer={'pm_month_select'}
              selectedDate = {selectedDateForPM}
              setNewData = {(data) => dispatch(changeSelectedDateProjectsManagement(data))}
            />

            <button
              type = 'submit'
              className = 'btn btn-outline-secondary'
              onClick = {()=>dispatch(setShowCreateModal(true))}
            >
              Add new project
            </button>
          </div>

          <div className = "card mt-5 mb-5">
            <Grid
              rows = {rows}
              columns = {columns}
            >
              <SortingState
                defaultSorting={[
                  { columnName: 'project', direction: 'asc' },
                ]}
                columnExtensions={[
                  { columnName: 'project', sortingEnabled: true },
                  { columnName: 'occupancy', sortingEnabled: false },
                  { columnName: 'hours', sortingEnabled: true},
                  { columnName: 'report', sortingEnabled: false},
                  { columnName: 'actions', sortingEnabled: false},
                ]}
              />
              <IntegratedSorting
                columnExtensions={[
                  { columnName: 'hours', compare: compareForTimeColumns },
                ]}

              />

              <RowDetailState
                expandedRowIds = {expandedRowIds}
                onExpandedRowIdsChange = {setExpandedRowIds}
                defaultExpandedRowIds = {[]}
              />
              <Table
                messages = {{
                  noData: isFetching?'':'There are no active projects to display.'
                }}
              />
              <TableHeaderRow
                resizingEnabled
                showSortingControls={true}
              />
              <TableRowDetail contentComponent = {RowDetail} />

            </Grid>

          </div>
        </div>

        <CreateProjectModal show = {isCreateModalShow} />
        <EditProjectModal show = {isEditModalShow} />
      </>
    )
  }

export default ProjectManagementComponent;
