import React, { useEffect, useState, useMemo } from 'react'
import { Grid, Table } from '@devexpress/dx-react-grid-bootstrap4'
import { selectUserProjects } from '../../../selectors/project-report-details'
import { columnExtensions, initialColumns } from '../projectReportConfig'
import useEqualSelector from '../../../custom-hook/useEqualSelector'
import { getSelectedMonthSelector } from '../../../reducers/projects-report'
import { Link } from 'react-router-dom'
import { getUsersProjectReport } from '../../../actions/projects-report'
import { sortUserProjectReport } from '../../../utils/common'
import { useDispatch } from 'react-redux'
import CustomCell from './CustomCell'

const ProjectReportRowDetail = ({ row, pmDetailed = false }) => {
  const dispatch = useDispatch();
  const userDetails = useEqualSelector(selectUserProjects);
  const selectedDate = useEqualSelector(getSelectedMonthSelector);
  const user = userDetails[row.id]

  const {  projects = [] } = user || {};

  const [childRows, setChildRows] = useState([]);

  const formattedProjects = useMemo(
    () => projects.map(({ name, total, is_active, is_full_time, working_time, idDeveloperProjects }) => ({
      name: '',
      developer_projects:{
          link:(
              <Link
                  to={{
                      pathname: '/timereport',
                      state: {
                          userId: row.id,
                          developer_project_id: idDeveloperProjects,
                          selectedDate,
                      },
                  }}
              >
                  {name}
              </Link>),
          title:name


      },
      totalHours: is_full_time ? 'fulltime' : `${working_time || 0} `,
      id: idDeveloperProjects,
      active_project: is_active,
    })),
    [projects, row, selectedDate]);


  useEffect(() => {
    const sortFormattedProjects = [...formattedProjects].sort(sortUserProjectReport);
    setChildRows(sortFormattedProjects)
  }, [formattedProjects]);

  useEffect(() => {
    dispatch(getUsersProjectReport(row.id));
  }, [row.id, selectedDate, dispatch]);

  return (
    <div>
      <Grid
        rows={childRows}
        columns={initialColumns}
      >
        <Table
          columnExtensions={columnExtensions}
          cellComponent={CustomCell}
          messages = {{
            noData: 'There are no projects.'
          }}
        />
      </Grid>
    </div>
  )
}

export default ProjectReportRowDetail;
