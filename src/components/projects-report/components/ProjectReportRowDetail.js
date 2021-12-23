import React, { useEffect, useState, useMemo } from 'react'
import { Grid, Table } from '@devexpress/dx-react-grid-bootstrap4'
import { UAHFormat } from '../../../utils/common'
import { selectUserProjects } from '../../../selectors/project-report-details'
import { getRoleUser } from '../../../selectors/user'
import { initialColumns, roleRestrictions } from '../projectReportConfig'
import useEqualSelector from '../../../custom-hook/useEqualSelector'
import { getSelectedMonthSelector } from '../../../reducers/projects-report'
import { PM } from '../../../constants/role-constant'
import { Link } from 'react-router-dom'
import { getUsersProjectReport } from '../../../actions/projects-report'
import { useDispatch } from 'react-redux'
import CustomCell from './CustomCell'

const ProjectReportRowDetail = ({ row }) => {
  const dispatch = useDispatch();
  const userDetails = useEqualSelector(selectUserProjects);
  const selectedDate = useEqualSelector(getSelectedMonthSelector);
  const userRole = useEqualSelector(getRoleUser);
  const user = userDetails[row.id]

  const {  projects = [] } = user || {};

  const [childColumns, setChildColumns] = useState(initialColumns);
  const [childRows, setChildRows] = useState([]);

  const formattedProjects = useMemo(
    () => projects.map(({ name, total, is_full_time, working_time, idDeveloperProjects }) => ({
      name: '',
      developer_projects: (
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
        </Link>
      ),
      salary_uah: '',
      rate_uah: '',
      totalHoursOvertime: is_full_time ? 'fulltime' : `${working_time || 0} `,
        total_hovers: '',
      total: userRole === PM ? '' : UAHFormat.format(total),
      total_expenses: '',
      total_uah: '',
      comments: '',
      is_processed: '',
      id: idDeveloperProjects,
    })),
    [projects.length]);


  useEffect(() => {
      setChildRows(formattedProjects)
  }, [formattedProjects]);

  useEffect(() => {
    dispatch(getUsersProjectReport(row.id));
  }, [row.id]);

  useEffect(() => {
    if (userRole && roleRestrictions?.[userRole]) {
      const filteredColumns = initialColumns.filter(
        (column) => !roleRestrictions[userRole].includes(column.name),
      );

      setChildColumns(filteredColumns);
    }
  }, [userRole]);

  return (
    <div>
      <Grid
        rows = {childRows}
        columns = {childColumns}
      >
        <Table
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
