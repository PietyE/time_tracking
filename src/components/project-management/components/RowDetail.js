import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Grid, Table } from '@devexpress/dx-react-grid-bootstrap4'
import { convertMinutesToHours } from '../../../utils/common'
import {
  getProjectReportById,
  downloadProjectReport,
} from '../../../actions/projects-management'
import {
  getIsFetchingPmPageSelector,
  getProjectReportByIdSelector,
} from '../../../reducers/projects-management'
import useEqualSelector from '../../../custom-hook/useEqualSelector'

const RowDetail = ({ row }) => {
  const dispatch = useDispatch()
  const isFetching = useEqualSelector(getIsFetchingPmPageSelector);
  const currentProjectReport = useEqualSelector(
    state => getProjectReportByIdSelector(state, row.id),
  );
  const _getProjectReportById = useCallback(
    (data) => {
      dispatch(getProjectReportById(data))

  }, [dispatch]
  );

  const _downloadProjectReport = useCallback(
    (data) => {
      dispatch(downloadProjectReport(data))
    },
    [dispatch]
  )

  const [childRows, setChildRows] = useState([])

  useEffect(() => {
    _getProjectReportById(row?.id)
  }, [_getProjectReportById, row])

  useEffect(() => {
    if (currentProjectReport) {
      const activeProjectReports = currentProjectReport.users.filter(
        (report) => report.is_active === true || report.minutes
      )
      const reformatProjects = activeProjectReports.map((user) => ({
        user: user.userName,
        occupancy: user.is_full_time ? 'Full-time' : 'Part-time',


        hours: convertMinutesToHours(user.minutes) || 0,
        report: (
          <Button
            variant="outline-*"
            onClick={() => _downloadProjectReport(user.projectReportId)}
          >
            {' '}
            <span
          className="oi oi-cloud-download" />
          </Button>
        ),
        actions: '',
      }))
      setChildRows(reformatProjects)
    }
  }, [currentProjectReport, _downloadProjectReport])

  const childColumns = [{name: 'user', title: 'User'}, {
    name: 'occupancy', title: 'Occupancy'
  }, { name: 'hours', title: 'Hours' },
    { name: 'report', title: 'Report' },
    { name: 'actions', title: ' ' },
  ]

  return (
    <div>
      <Grid rows={childRows} columns={childColumns}>
        <Table />
        <Table
          messages={{
            noData: isFetching
              ? ''
              : 'There are no developers in this project yet.',
        }}
      />
    </Grid>
  </div>)
}

export default RowDetail
