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
  getSelectedDateForPMSelector,
  getSelectedMonthForPMSelector,
  getIsFetchingPmPageSelector, getIsShowEditModalSelector, getIsShowCreateModalSelector,
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement, clearPmProjects,
  getAllProjects, setSelectedProjectId,
  downloadAllTeamProjectReport,
  setShowCreateModal, setShowEditModal
} from '../../actions/projects-management'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
import EditProjectModal from './components/EditProjectModal'
import './style.scss'
import { Button } from 'react-bootstrap'
import SpinnerStyled from '../ui/spinner'

const ProjectManagementComponent =({
                                     selectedDateForPM,
                                     changeSelectedDateProjectsManagement,
                                     getAllProjects,
                                     projects,
                                     clearPmProjects,
                                     isFetching,
                                     month,
                                     setShowCreateModal,
                                     setShowEditModal,
                                     isEditModalShow,
                                     isCreateModalShow,
}) => {

    useEffect(() => {
      getAllProjects()
    }, [getAllProjects])

    useEffect(()=>{
      clearPmProjects()
      setExpandedRowIds([])
      getAllProjects()
    },[month])

    const dispatch = useDispatch()

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
    const _setSelectedProjectId = useCallback(
      (data) => {
        dispatch(setSelectedProjectId(data))
      },
      [dispatch],
    )
    const openEditModal = (id) => {
      _setSelectedProjectId(id)
      setShowEditModal(true)
    }

    const [rows, setRows] = useState([])

    useEffect(() => {
      if (projects?.length > 0) {
        const reformatProjects = projects.map(project => ({
          project: project.name,
          occupancy: ' ',
          hours: project?.total_hours || 0,
          report: <Button variant = "outline-*" onClick = {() => _downloadAllTeamProjectReport(project.id)}>
            <span className = "oi oi-cloud-download"/>
          </Button>,
          actions: <span className = "oi oi-pencil" onClick = {() => openEditModal(project.id)}/>,
          id: project.id,
        }))
        setRows(reformatProjects)
      }
    }, [projects])

    const [expandedRowIds, setExpandedRowIds] = useState([])

    return (
      <>
        {isFetching && <SpinnerStyled/>}
        <div className = "container project_management_container">
          <div className = "flex row justify-content-between">
            <SelectMonth
              selectedDate = {selectedDateForPM}
              setNewData = {changeSelectedDateProjectsManagement}
            />

            <button
              type = 'submit'
              className = 'btn btn-outline-secondary'
              onClick = {()=>setShowCreateModal(true)}
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
                defaultExpandedRowIds = {[]}
              />
              <Table/>
              <TableHeaderRow showSortingControls sortLabelComponent = {SortingLabel} resizingEnabled/>
              <TableRowDetail contentComponent = {RowDetail}/>
            </Grid>
          </div>


        </div>

        <CreateProjectModal show = {isCreateModalShow} />
        <EditProjectModal show = {isEditModalShow} />
      </>
    )
  }

const mapStateToProps = (state) => ({
  selectedDateForPM: getSelectedDateForPMSelector(state),
  projects: getAllProjectsSelector(state),
  isFetching: getIsFetchingPmPageSelector(state),
  month: getSelectedMonthForPMSelector(state),
  isEditModalShow: getIsShowEditModalSelector(state),
  isCreateModalShow: getIsShowCreateModalSelector(state),
})
const actions = {
  changeSelectedDateProjectsManagement,
  getAllProjects,
  clearPmProjects,
  setShowEditModal,
  setShowCreateModal
}


export default connect(mapStateToProps, actions)(ProjectManagementComponent)
