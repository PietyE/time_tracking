import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap'
import { Grid, Table } from '@devexpress/dx-react-grid-bootstrap4'

import {
  getProjectReportById,
  getSelectedMonthForPMSelector,
} from '../../../reducers/projects-management'

const RowDetail = ({ row, currentProject }) => {

  const [childRows, setChildRows] = useState([])

  useEffect(() => {
    let reformatProjects
    if (currentProject) {
      reformatProjects = currentProject.users.map(user => ({
        user: user.userName,
        occupancy: user.is_fulltime ? 'Yes' : 'No',
        hours: user.hours,
        report: downloadIcon,
        actions: editIcon,
      }))
      setChildRows(reformatProjects)
    }
  }, [currentProject])

  const downloadIcon = <Button variant = "outline-*"><span className = "oi oi-cloud-download"/></Button>
  const editIcon = <span className = "oi oi-pencil"/>


  const [childColumns] = useState([
    { name: 'user', title: 'User' },
    { name: 'occupancy', title: 'Occupancy' },
    { name: 'hours', title: 'Hours' },
    { name: 'report', title: 'Report' },
    { name: 'actions', title: ' ' },
  ])


  return (
    <div>
      <Grid
        rows = {childRows}
        columns = {childColumns}
      >
        <Table/>
        <Table/>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  currentProject: getProjectReportById(state, ownProps?.row?.id)
})

export default connect(mapStateToProps)(RowDetail)
