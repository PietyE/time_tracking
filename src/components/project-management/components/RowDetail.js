import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Grid, Table } from '@devexpress/dx-react-grid-bootstrap4'
import { isEqual } from 'lodash'

import { getProjectReportById, downloadProjectReport } from '../../../actions/projects-management'
import { getProjectReportByIdSelector } from '../../../reducers/projects-management'

const RowDetail = ({ row, currentProjectReport }) => {
  const dispatch = useDispatch()
    const _getProjectReportById = useCallback(
    (data) => {
      dispatch(getProjectReportById(data))
    },
    [dispatch],
  )
  const _downloadProjectReport = useCallback(
    (data) => {
      dispatch(downloadProjectReport(data))
    },
    [dispatch],
  )
  const downloadXLS = (id) => {
    _downloadProjectReport(id)
  }
  // const downloadIcon =id=>
  //   (<Button variant = "outline-*" onClick={(id)=>downloadXLS(id)}> <span className = "oi oi-cloud-download"/></Button>)


  const [childRows, setChildRows] = useState([])

  useEffect(() => {
    _getProjectReportById(row?.id)

  }, [])

  useEffect(() => {
    if (currentProjectReport) {
      let reformatProjects = []
      reformatProjects = currentProjectReport.users.map(user => ({
        user: user.userName,
        occupancy: user.is_fulltime ? 'Full-time' : 'Part-time',
        hours: user.hours,
        report: <Button variant = "outline-*" onClick={()=>downloadXLS(user.projectReportId)}> <span className = "oi oi-cloud-download"/></Button>,
        actions: '',

      }))
      setChildRows(reformatProjects)
    }
  }, [currentProjectReport])



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
  currentProjectReport: getProjectReportByIdSelector(state, ownProps?.row?.id),
})

export default connect(mapStateToProps)(RowDetail)
