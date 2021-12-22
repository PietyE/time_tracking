import React, { useCallback, useEffect, useState } from 'react'
import { RowDetailState } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4'
import { useDispatch, useSelector } from 'react-redux'
import isEqual from 'lodash/isEqual'

import {
  getAllProjectsSelector,
  getSelectedDateForPMSelector,
  getSelectedMonthForPMSelector,
  getIsFetchingPmPageSelector,
  getIsShowEditModalSelector,
  getIsShowCreateModalSelector,
  getProjectManagerListSelector,
  getSelectedPmSelector,
  getShownProjectSelector,
  getFilteredProjectSelector,
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement,
  clearPmProjects,
  getAllProjects,
  setSelectedProjectId,
  downloadAllTeamProjectReport,
  setShowCreateModal,
  setShowEditModal,
  setPm,
  setShownProject,
  getProjectReportById,
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

import { convertMinutesToHours } from '../../utils/common'

/////
import { getDevelopersProjectInProjectReport } from 'actions/projects-report'
import { getProjectInTimeReportSelector } from 'reducers/projects-report'

const ProjectManagementComponent = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([])

  const [rows, setRows] = useState([])

  const columns = [
    { name: 'project', title: 'Project' },
    { name: 'occupancy', title: 'Occupancy' },
    { name: 'hours', title: 'Hours' },
    { name: 'report', title: 'Report' },
    { name: 'actions', title: 'Actions' },
  ]

  const dispatch = useDispatch()

  //const projectReports = useSelector(getProjectInTimeReportSelector, isEqual)

  const selectedDateForPM = useSelector(getSelectedDateForPMSelector, isEqual)
  const projects = useSelector(getAllProjectsSelector, isEqual)
  const isFetching = useSelector(getIsFetchingPmPageSelector, isEqual)
  // const month = useSelector(getSelectedMonthForPMSelector, isEqual)
  const isEditModalShow = useSelector(getIsShowEditModalSelector, isEqual)
  const isCreateModalShow = useSelector(getIsShowCreateModalSelector, isEqual)
  const projectManagers = useSelector(getProjectManagerListSelector, isEqual)
  const selectedPm = useSelector(getSelectedPmSelector, isEqual)
  const currentPm = useSelector(getCurrentUserSelector, isEqual)

  const filteredProjects = useSelector(getFilteredProjectSelector, isEqual)

  const _downloadAllTeamProjectReport = useCallback(
    (data) => {
      dispatch(downloadAllTeamProjectReport(data))
    },
    [dispatch]
  )

  // const _getProjectReportById = useCallback(
  //   (data) => {
  //     dispatch(getProjectReportById(data))
  //   },
  //   [dispatch]
  // )

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

  const openEditModal = (id) => {
    _setSelectedProjectId(id)
    dispatch(setShowEditModal(true))
  }

  const onSelectPm = (data) => {
    dispatch(setPm(data))
    dispatch(setShownProject({}))
    setExpandedRowIds([])
  }

  const clearSelectedProject = () => {
    dispatch(setShownProject({}))
  }

  const onSelectProject = (data) => {
    dispatch(setShownProject(data))
  }

  const reformatProj = () => {
    return filteredProjects.map((project) => ({
      project: project.name,
      occupancy: ' ',
      hours: convertMinutesToHours(project?.total_minutes) || 0,
      report: (
        <Button
          variant="outline-*"
          onClick={() => _downloadAllTeamProjectReport(project.id)}
        >
          <span className="oi oi-cloud-download" />
        </Button>
      ),
      actions: (
        <span
          className="oi oi-pencil"
          onClick={() => openEditModal(project.id)}
        />
      ),
      id: project.id,
    }))
  }

  useEffect(() => {
    if (filteredProjects?.length) {
      setRows(reformatProj())
    }
  }, [filteredProjects])

  // useEffect(() => {
  //   if (isEmpty(selectedPm)) {
  //     dispatch(setPm(currentPm))
  //   }
  // }, [])

  // useEffect(() => {
  //   dispatch(clearPmProjects())
  //   setExpandedRowIds([])
  //   dispatch(getAllProjects())
  // }, [month])

  useEffect(() => {
    dispatch(getAllProjects())
  }, [])

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
      {isFetching && <SpinnerStyled />}
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
            title="choose project..."
            listItems={projects}
            onSelected={onSelectProject}
            valueKey="name"
            idKey="id"
            extraClassContainer={'project_select project_select'}
            onClear={clearSelectedProject}
            disabled={!projects?.length}
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
            <RowDetailState
              expandedRowIds={expandedRowIds}
              onExpandedRowIdsChange={setExpandedRowIds}
              defaultExpandedRowIds={[]}
            />
            <Table
              messages={{
                noData: isFetching
                  ? ''
                  : 'There are no active projects to display.',
              }}
            />
            <TableHeaderRow resizingEnabled />
            <TableRowDetail contentComponent={RowDetail} />
          </Grid>
        </div>
      </div>

      <CreateProjectModal show={isCreateModalShow} />
      <EditProjectModal show={isEditModalShow} />
    </>
  )
}

export default ProjectManagementComponent
