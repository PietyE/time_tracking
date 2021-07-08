import React, { useEffect, useState } from 'react'
import SelectMonth from '../ui/select-month'
import { RowDetailState } from '@devexpress/dx-react-grid';
import { Button } from 'react-bootstrap'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4';

import { connect } from 'react-redux'
import { getAllProjectsSelector, getSelectedMonthForPMSelector } from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement,
  getAllProjects,
} from '../../actions/projects-management'
import './style.scss'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
import './style.scss'

const ProjectManagementComponent = (
  {
    selectedDateForPM,
    changeSelectedDateProjectsManagement,
    getAllProjects,
    projects,
  }) => {

  const [isCreateProjectModalShown, setCreateProjectModalShown] = useState(true);

  useEffect(() => {
    getAllProjects();
  }, [])

  const downloadIcon = <Button variant="outline-*"><span className="oi oi-cloud-download"/></Button>;
  const editIcon = <span className="oi oi-pencil"/>;

  const [columns] = useState([
    { name: 'project', title: 'Project' },
    { name: 'occupancy', title: 'Occupancy' },
    { name: 'hours', title: 'Hours' },
    { name: 'report', title: 'Report' },
    { name: 'actions', title: ' ' },
  ]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const reformatProjects = projects?.reduce((acc, pr) => {
      const column = {
        project: pr.name,
          occupancy: ' ',
          hours: pr.totalHours ||'240h',
          report: downloadIcon,
          actions: editIcon,
          id: pr.id,
      }

      return [ ...acc, column ]
    }, [])
    setRows(reformatProjects);
  }, [projects])


  const [expandedRowIds, setExpandedRowIds] = useState([]);

  return (
    <>
    <div className="container project_management_container">
      <div className="flex row justify-content-between">
        <SelectMonth
          selectedDate={selectedDateForPM}
          setNewData={changeSelectedDateProjectsManagement}
        />

        <button
          type='submit'
          className='btn btn-outline-secondary'
          onClick={setCreateProjectModalShown.bind(setCreateProjectModalShown,true)}
        >
          Add new project
        </button>
      </div>

      <div className="card mt-5 mb-5">
        <Grid
          rows={rows}
          columns={columns}
        >
          <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={setExpandedRowIds}
          />
          <Table/>
          <TableHeaderRow />
          <TableRowDetail contentComponent={RowDetail} />
        </Grid>
      </div>
  </div>

      <CreateProjectModal
        show={isCreateProjectModalShown}
        onClose={setCreateProjectModalShown.bind(setCreateProjectModalShown,false)}
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
