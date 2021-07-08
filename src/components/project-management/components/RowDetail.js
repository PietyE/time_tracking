import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  Grid,
  Table,
} from '@devexpress/dx-react-grid-bootstrap4';

import { connect } from 'react-redux'
import { getUsersOnProjectSelector } from '../../../reducers/projects-management'
import {
  getSelectedProject,
} from '../../../actions/projects-management'

const RowDetail = (
  {
    row,
    getSelectedProject,
    users
  }) => {


  useEffect(() => {
    if (row.id) {
      getSelectedProject(row.id);
    }
  }, [])

  const downloadIcon = <Button variant="outline-*"><span className="oi oi-cloud-download"/></Button>;
  const editIcon = <span className="oi oi-pencil"/>;




  const [childColumns] = useState([
    { name: 'user', title: 'User' },
    { name: 'occupancy', title: 'Occupancy' },
    { name: 'hours', title: 'Hours' },
    { name: 'report', title: 'Report' },
    { name: 'actions', title: ' ' },
  ]);
  const [childRows, setChildRows] = useState([
    { user: 'Some name 1', occupancy: ' ', hours: '40h', report: downloadIcon, actions: editIcon },
    { user: 'Some name 2', occupancy: 'part-time', hours: '100h', report: downloadIcon, actions: editIcon  },
    { user: 'Some name 3', occupancy: 'part-time', hours: '100h', report: downloadIcon, actions: editIcon  },
  ]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    // const reformatProjects = users?.reduce((acc, user) => {
    //   const column = {
    //     user: user.name,
    //     occupancy: ' ',
    //     hours: '240h',
    //     report: downloadIcon,
    //     actions: editIcon,
    //     // id: pr.id,
    //   }
    //
    //   return [ ...acc, column ]
    // }, [])
    // setChildRows(reformatProjects);
  }, [users])


  return (
    <div>
      <Grid
        rows={childRows}
        columns={childColumns}
      >
        <Table />
        <Table />
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: getUsersOnProjectSelector(state),

})
const actions = {
  getSelectedProject,
}


export default connect(mapStateToProps, actions)(RowDetail)
