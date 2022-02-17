import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IntegratedSorting, RowDetailState, SortingState } from '@devexpress/dx-react-grid'
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
  getIsFetchingPmPageSelector,
  getIsShowEditModalSelector,
  getIsShowCreateModalSelector,
  getProjectManagerListSelector,
  getSelectedPmSelector,
  getFilteredProjectSelector, getSelectedProjectSelector,
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement,
  getAllProjects,
  setSelectedProjectId,
  downloadAllTeamProjectReport,
  setShowCreateModal,
  setShowEditModal,
  setPm,
  setShownProject,
  getProjectReportById, setSelectedProject,
} from '../../actions/projects-management'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
import EditProjectModal from './components/EditProjectModal'
import './style.scss'
import { Button } from 'react-bootstrap'
import SpinnerStyled from '../ui/spinner'
import Select from '../ui/select'
import SelectMonth from '../ui/select-month'
import { getCurrentUserSelector } from '../../reducers/profile'

import { compareForTimeColumns, convertMinutesToHours } from '../../utils/common'

import useEqualSelector from '../../custom-hook/useEqualSelector';
import useSorting from '../../custom-hook/useSorting'
import CustomCell from './components/CustomCell'
import { columnExtensions } from './ProjectManagementConfig'

const ProjectManagementComponent = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const [rows, setRows] = useState([])

  const { sorting, handleSortingChange } = useSorting();

  const columns = [
    { name: 'project', title: 'Project' },
    { name: 'occupancy', title: 'Occupancy' },
    { name: 'hours', title: 'Hours' },
    { name: 'report', title: 'Report' },
    { name: 'actions', title: 'Actions' },
  ]

  const dispatch = useDispatch()

  const selectedDateForPM = useEqualSelector(getSelectedDateForPMSelector)
  const projects = useEqualSelector(getAllProjectsSelector)
  const isFetching = useEqualSelector(getIsFetchingPmPageSelector)
  // const month = useEqualSelector(getSelectedMonthForPMSelector)
  const isEditModalShow = useEqualSelector(getIsShowEditModalSelector)
  const isCreateModalShow = useEqualSelector(getIsShowCreateModalSelector)
  const projectManagers = useEqualSelector(getProjectManagerListSelector)
  const selectedPm = useEqualSelector(getSelectedPmSelector)
  const currentPm = useEqualSelector(getCurrentUserSelector)
  const filteredProjects =useEqualSelector(getFilteredProjectSelector)
  const selectedProject = useEqualSelector(getSelectedProjectSelector)

  const projectList = [
    {
      id:0,
      name:'Select all',
    },
    ...projects
  ]

  const _downloadAllTeamProjectReport = useCallback(
    (data) => {
      dispatch(downloadAllTeamProjectReport(data))
    },
    [dispatch]
  )

  const _setSelectedProjectId = useCallback(
    (data) => {
      dispatch(setSelectedProjectId(data))
    },
    [dispatch]
  )

  const _changeSelectedDateProjectsManagement = useCallback(
    (data) => {
      dispatch(changeSelectedDateProjectsManagement(data))
    },
    [dispatch]
  )

  const openEditModal = useCallback(
    (id) => {
      _setSelectedProjectId(id)
      dispatch(setShowEditModal(true))
    },
    [_setSelectedProjectId, dispatch]
  )

  const onSelectPm = (data) => {
    dispatch(setPm(data))
    dispatch(setShownProject({}))
    setExpandedRowIds([])
    dispatch(setSelectedProject(projectList[0]))
  }

  // eslint-disable-next-line no-unused-vars
  // const clearSelectedProject = () => {
  //   dispatch(setShownProject({}))
  // }

  const onSelectProject = (data) => {
    if(data.id ==='0'){
      dispatch(setShownProject({}))
    }else {
      dispatch(setShownProject(data))
    }
    dispatch(setSelectedProject(data))
  }

  const handleOpenEditModal = useCallback((projectId) => {
    dispatch(getProjectReportById(projectId));
    openEditModal(projectId);
  }, [dispatch, openEditModal])

  const projectNamesList = useMemo(() => rows.map(item => item.project), [rows])

  const reformatProj = useMemo(() => {
    return filteredProjects.map((project) => ({
      project: project.name,
      occupancy: ' ',
      hours: convertMinutesToHours(project?.total_minutes || ''),
      report: (
        <Button
          variant="outline-*"
          onClick={() => _downloadAllTeamProjectReport(project.id)}
        >
          <span className="oi oi-cloud-download" title='Export'/>
        </Button>
      ),
      actions: (
        <span
          title='Edit'
          className="oi oi-pencil"
          onClick={() => handleOpenEditModal(project.id)}
        />
      ),
      id: project.id,
    }))
  }, [filteredProjects, _downloadAllTeamProjectReport, handleOpenEditModal])

  useEffect(() => {
    if (filteredProjects?.length) {
      setRows(reformatProj)
    }
  }, [filteredProjects, reformatProj])

  useEffect(() => {
    dispatch(getAllProjects())
  }, [isEditModalShow, dispatch, selectedDateForPM])

  useEffect(() => {
    if(selectedProject.id) {
      const currentProject = (projectList.find((item) => {
        return item.id === selectedProject.id
      }))
      if(currentProject) {
        onSelectProject(currentProject)
      }
    }
  }, [selectedProject, projectList])

  const projectManagerSelectList = [
    {
      email: '',
      id: 'select-all',
      name: 'Select All',
      role: null,
    },
    ...projectManagers,
  ]


  return (
    <>
      {!!isFetching && !isEditModalShow && <SpinnerStyled />}
      <div className="container project_management_container">
        <div className="flex row justify-content-between">
          <Select
            title="choose project manager..."
            listItems={projectManagerSelectList}
            onSelected={onSelectPm}
            valueKey="name"
            idKey="id"
            extraClassContainer={'developer_select pm_select'}
            initialChoice={selectedPm || currentPm}
            isSearch
          />

          <Select
            title={'Select all'}
            listItems={projectList}
            onSelected={onSelectProject}
            valueKey="name"
            idKey="id"
            extraClassContainer={'project_select project_select'}
            // onClear={clearSelectedProject}
            disabled={!projects?.length}
            initialChoice={selectedProject}
            isSearch
          />

          <SelectMonth
            extraClassNameContainer={'pm_month_select'}
            selectedDate={selectedDateForPM}
            setNewData={_changeSelectedDateProjectsManagement}
          />

          <button
            type="submit"
            className="btn btn-outline-secondary"
            onClick={() => dispatch(setShowCreateModal(true))}
          >
            Add new project
          </button>
        </div>

        <div className="card mt-5 mb-5">
          <Grid rows={rows} columns={columns}>
            <SortingState
              sorting={sorting}
              onSortingChange={handleSortingChange}
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
              expandedRowIds={expandedRowIds}
              onExpandedRowIdsChange={setExpandedRowIds}
              defaultExpandedRowIds={[]}
            />
            <Table
              columnExtensions={columnExtensions}
              cellComponent={CustomCell}
              messages={{
                noData: isFetching
                  ? ''
                  : 'There are no active projects to display.',
              }}
            />
            <TableHeaderRow showSortingControls />
            <TableRowDetail contentComponent={RowDetail} />
          </Grid>
        </div>
      </div>

      <CreateProjectModal show={isCreateModalShow} />
      <EditProjectModal
        show={isEditModalShow}
        projectList={projectNamesList}
      />
    </>
  )
}

export default ProjectManagementComponent
