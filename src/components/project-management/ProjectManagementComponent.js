import React, { useEffect, useState } from 'react'
import SelectMonth from '../ui/select-month'
  import { RowDetailState, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4'
import { connect } from 'react-redux'
import {
  getAllProjectsSelector,
  getSelectedMonthForPMSelector,
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement,
  getAllProjects,
} from '../../actions/projects-management'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
import './style.scss'
import { Button } from 'react-bootstrap'

const ProjectManagementComponent =
  ({ selectedDateForPM, changeSelectedDateProjectsManagement, getAllProjects, projects, getUsersInfoByProject }) => {
    useEffect(() => {
      getAllProjects()
    }, [])

    const [isCreateProjectModalShown, setCreateProjectModalShown] = useState(false)

    const [columns] = useState([
      { name: 'project', title: 'Project' },
      { name: 'occupancy', title: 'Occupancy' },
      { name: 'hours', title: 'Hours' },
      { name: 'report', title: 'Report', },
      { name: 'actions', title: '' },
    ])
    const SortingLabel = React.memo(props => {
      if (props.column.name === "report" || props.column.name === "actions")
        return <TableHeaderRow.SortLabel {...props} disabled />;
      return <TableHeaderRow.SortLabel {...props} />;
    });
    const [rows, setRows] = useState([])
    const downloadIcon = <Button variant = "outline-*"><span className = "oi oi-cloud-download"/></Button>
    const editIcon = <span className = "oi oi-pencil"/>
    useEffect(() => {
      if (projects?.length > 0) {
        const reformatProjects = projects.map(project => ({
          project: project.name,
          occupancy: ' ',
          hours: '',
          report: downloadIcon,
          actions: editIcon,
          id: project.id,
        }))
        setRows(reformatProjects)
      }
    }, [projects])

    const [expandedRowIds, setExpandedRowIds] = useState([])
    return (
      <>
        <div className = "container project_management_container">
          <div className = "flex row justify-content-between">
            <SelectMonth
              selectedDate = {selectedDateForPM}
              setNewData = {changeSelectedDateProjectsManagement}
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
                defaultSorting={[{ columnName: 'project', direction: 'asc' }]}/>
                <IntegratedSorting/>
              <RowDetailState
                expandedRowIds = {expandedRowIds}
                onExpandedRowIdsChange = {setExpandedRowIds}
                // toggleDetailRowExpanded={}
                defaultExpandedRowIds={[]}
              />
              <Table/>
              <TableHeaderRow showSortingControls  sortLabelComponent={SortingLabel}/>
              <TableRowDetail contentComponent = {RowDetail}/>
            </Grid>
          </div>
        </div>

        <CreateProjectModal
          show = {isCreateProjectModalShown}
          onClose = {setCreateProjectModalShown.bind(setCreateProjectModalShown, false)}
        />

      </>
    )
  }

const mapStateToProps = (state) => ({
  selectedDateForPM: getSelectedMonthForPMSelector(state),
  projects: getAllProjectsSelector(state),
})
const actions = {
  changeSelectedDateProjectsManagement,
  getAllProjects,
}


export default connect(mapStateToProps, actions)(ProjectManagementComponent)
