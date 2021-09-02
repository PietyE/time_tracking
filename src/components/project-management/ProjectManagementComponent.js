import React, { useCallback, useEffect, useState } from 'react'
import SelectMonth from '../ui/select-month'
import {
  RowDetailState, SortingState, IntegratedSorting,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4'
import { connect, useDispatch } from 'react-redux'
import {
  getAllProjectsSelector,
  getSelectedMonthForPMSelector,
  getIsFetchingPmPageSelector,
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement, clearPmProjects,
  getAllProjects, downloadProjectReport, setSelectedProjectId,
  downloadAllTeamProjectReport,
} from '../../actions/projects-management'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
import EditProjectModal from './components/EditProjectModal'
import './style.scss'
import { Button } from 'react-bootstrap'
import SpinnerStyled from '../ui/spinner'

const ProjectManagementComponent =
  ({ selectedDateForPM, changeSelectedDateProjectsManagement, getAllProjects, projects, clearPmProjects, isFetching }) => {

    useEffect(() => {
      getAllProjects()
    }, [getAllProjects])
    const dispatch = useDispatch()

    const [isCreateProjectModalShown, setCreateProjectModalShown] = useState(false)
    const [isEditProjectModalShown, setEditProjectModalShown] = useState(false)
    const [columns] = useState([
      { name: 'project', title: 'Project' },
      { name: 'occupancy', title: 'Occupancy' },
      { name: 'hours', title: 'Hours' },
      { name: 'report', title: 'Report' },
      { name: 'actions', title: '' },
    ])
    const SortingLabel = React.memo(props => {
      if (props.column.name === 'report' || props.column.name === 'actions')
        return <TableHeaderRow.SortLabel {...props} disabled/>
      return <TableHeaderRow.SortLabel {...props} />
    })


    const _downloadAllTeamProjectReport = useCallback(
      (data) => {
        dispatch(downloadAllTeamProjectReport(data))
      },
      [dispatch],
    )
    // const _downloadProjectReport = useCallback(
    //   (data) => {
    //     dispatch(downloadProjectReport(data))
    //   },
    //   [dispatch],
    // )
    const _setSelectedProjectId = useCallback(
      (data) => {
        dispatch(setSelectedProjectId(data))
      },
      [dispatch],
    )
    const openEditModal = (id) => {
      _setSelectedProjectId(id)
      setEditProjectModalShown(true)
    }

    const [rows, setRows] = useState([])

    useEffect(() => {
      if (projects?.length > 0) {
        const reformatProjects = projects.map(project => ({
          project: project.name,
          occupancy: ' ',
          hours: '',
          report: <Button variant = "outline-*" onClick = {() => _downloadAllTeamProjectReport(project.id)}> <span
            className = "oi oi-cloud-download"/></Button>,
          actions: <span className = "oi oi-pencil" onClick = {() => openEditModal(project.id)}/>,
          id: project.id,
        }))
        setRows(reformatProjects)
      }
    }, [projects])

    const [expandedRowIds, setExpandedRowIds] = useState([])

    const clear = () => {
      clearPmProjects()
      setExpandedRowIds([])
    }
    return (
      <>
        {isFetching && <SpinnerStyled/>}
        <div className = "container project_management_container">
          <div className = "flex row justify-content-between">
            <SelectMonth
              selectedDate = {selectedDateForPM}
              setNewData = {changeSelectedDateProjectsManagement}
              clearProjects = {clear}

            />

            <button
              type = 'submit'
              className = 'btn btn-outline-secondary'
              onClick = {setCreateProjectModalShown.bind(setCreateProjectModalShown, true)}
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
                defaultSorting = {[{ columnName: 'project', direction: 'asc' }]}/>
              <IntegratedSorting/>
              <RowDetailState
                expandedRowIds = {expandedRowIds}
                onExpandedRowIdsChange = {setExpandedRowIds}
                // toggleDetailRowExpanded={}
                defaultExpandedRowIds = {[]}
              />
              <Table/>
              <TableHeaderRow showSortingControls sortLabelComponent = {SortingLabel} resizingEnabled/>
              <TableRowDetail contentComponent = {RowDetail}/>
            </Grid>
          </div>


        </div>

        <CreateProjectModal
          show = {isCreateProjectModalShown}
          onClose = {setCreateProjectModalShown.bind(setCreateProjectModalShown, false)}
        />
        <EditProjectModal
          show = {isEditProjectModalShown}
          onClose = {setEditProjectModalShown.bind(setEditProjectModalShown, false)
          }
        />
      </>
    )
  }

const mapStateToProps = (state) => ({
  selectedDateForPM: getSelectedMonthForPMSelector(state),
  projects: getAllProjectsSelector(state),
  isFetching: getIsFetchingPmPageSelector(state),
})
const actions = {
  changeSelectedDateProjectsManagement,
  getAllProjects,
  clearPmProjects,

}


export default connect(mapStateToProps, actions)(ProjectManagementComponent)
