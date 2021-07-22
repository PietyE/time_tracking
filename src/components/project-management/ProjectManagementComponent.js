import React, { useEffect, useState } from 'react'
import SelectMonth from '../ui/select-month'
  import { RowDetailState, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4'
import { isEqual } from 'lodash'
import { connect, useSelector } from 'react-redux'
import {
  getAllProjectsSelector,
  getSelectedMonthForPMSelector,
  getProjectsWithReport,
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement,
  getAllProjects, getUsersInfoByProject,
} from '../../actions/projects-management'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
import './style.scss'

const ProjectManagementComponent =
  ({ selectedDateForPM, changeSelectedDateProjectsManagement, getAllProjects, projects, getUsersInfoByProject }) => {

    useEffect(() => {
      getAllProjects()
    }, [])

    useEffect(() => {
      if (projects.length > 0) {
        getUsersInfoByProject()
      }
    }, [projects])

    const [isCreateProjectModalShown, setCreateProjectModalShown] = useState(false)

    const projectsWithReport = useSelector(getProjectsWithReport, isEqual)

    const downloadIcon = <Button variant = "outline-*"><span className = "oi oi-cloud-download"/></Button>
    const editIcon = <span className = "oi oi-pencil"/>

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
    const calcTotalHours = id => {
      const currentProject = projectsWithReport.find(project => project.projectId === id)
      if (currentProject) {
        const totalHours = currentProject.users.reduce((acc, cur) => {
          return acc + Number(cur.hours)
        }, 0)
        return totalHours
      }
    }

    useEffect(() => {
      if (projectsWithReport?.length > 0) {
        const reformatProjects = projects.map(project => ({
          project: project.name,
          occupancy: ' ',
          hours: calcTotalHours(project.id),
          report: downloadIcon,
          actions: editIcon,
          id: project.id,
        }))
        setRows(reformatProjects)
      }

    }, [projectsWithReport, projects])


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
              {/*<LocalSorting/>*/}
              <RowDetailState
                expandedRowIds = {expandedRowIds}
                onExpandedRowIdsChange = {setExpandedRowIds}
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
  getAllProjects, getUsersInfoByProject,
}


export default connect(mapStateToProps, actions)(ProjectManagementComponent)
