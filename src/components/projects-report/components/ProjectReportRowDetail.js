import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Grid, Table } from '@devexpress/dx-react-grid-bootstrap4'
import {convertMinutesToHours} from '../../../utils/common'
import { getProjectReportById, downloadProjectReport } from '../../../actions/projects-management'
import { getIsFetchingPmPageSelector, getProjectReportByIdSelector } from '../../../reducers/projects-management'

const ProjectReportRowDetail = ({ row, currentProjectReport, isFetching }) => {
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

  const [childRows, setChildRows] = useState([])

  useEffect(() => {
    _getProjectReportById(row?.id)

  }, [])

  useEffect(() => {
    if (currentProjectReport) {
      const activeProjectReports = currentProjectReport.users.filter(report => report.is_active === true || report.minutes)
      const reformatProjects = activeProjectReports.map(user => ({
        user: user.userName,
        occupancy: user.is_full_time ? 'Full-time' : 'Part-time',
        hours: convertMinutesToHours(user.minutes) || 0,
        report: <Button variant = "outline-*" onClick={()=>_downloadProjectReport(user.projectReportId)}> <span className = "oi oi-cloud-download"/></Button>,
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
        <Table
          messages = {{
            noData: isFetching?'':'There are no developers in this project yet.'
          }}
        />
      </Grid>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  currentProjectReport: getProjectReportByIdSelector(state, ownProps?.row?.id),
  isFetching: getIsFetchingPmPageSelector(state),
})

export default connect(mapStateToProps)(ProjectReportRowDetail)
