import React, { useEffect, useState, useMemo } from 'react'
import { Grid, Table } from '@devexpress/dx-react-grid-bootstrap4'
import { UAHFormat } from '../../../utils/common'
import { selectUserProjects } from '../../../selectors/project-report-details'
import { getRoleUser } from '../../../selectors/user'
import { columnExtensions, initialColumns, roleRestrictions } from '../projectReportConfig'
import useEqualSelector from '../../../custom-hook/useEqualSelector'
import { getSelectedMonthSelector } from '../../../reducers/projects-report'
import { DEVELOPER, PM } from '../../../constants/role-constant'
import { Link } from 'react-router-dom'
import { getUsersProjectReport } from '../../../actions/projects-report'
import { sortUserProjectReport } from '../../../utils/common'
import { useDispatch } from 'react-redux'
import CustomCell from './CustomCell'

const ProjectReportRowDetail = ({ row, pmDetailed = false }) => {
  const dispatch = useDispatch();
  const userDetails = useEqualSelector(selectUserProjects);
  const selectedDate = useEqualSelector(getSelectedMonthSelector);
  const userRole = useEqualSelector(getRoleUser);
  const user = userDetails[row.id]

  const {  projects = [] } = user || {};

  const [childColumns, setChildColumns] = useState(initialColumns);
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


      } ,
        salary_uah: '',
      rate_uah: '',
      totalHours: working_time,
      total: userRole === PM ? '' : UAHFormat.format(total),
      total_expenses: '',
      total_uah: '',
      comments: '',
      is_processed: '',
      id: idDeveloperProjects,
      active_project: is_active,
    })),
    [projects, row, selectedDate, userRole]);


  useEffect(() => {
    const sortFormattedProjects = [...formattedProjects].sort(sortUserProjectReport);
    setChildRows(sortFormattedProjects)
  }, [formattedProjects]);

  useEffect(() => {
    dispatch(getUsersProjectReport(row.id));
  }, [row.id, dispatch]);

  useEffect(() => {
    if (userRole && roleRestrictions?.[userRole]) {
      const filteredColumns = initialColumns.filter(
        (column) => !roleRestrictions[pmDetailed ? DEVELOPER : userRole].includes(column.name),
      );

      setChildColumns(filteredColumns);
    }
  }, [userRole, pmDetailed]);

  return (
    <div>
      <Grid
        rows = {childRows}
        columns = {childColumns}
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
