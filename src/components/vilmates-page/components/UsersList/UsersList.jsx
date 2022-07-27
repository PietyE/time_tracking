import React from 'react'
import { Grid } from '@material-ui/core'
import { users } from 'mocks/users'
import { UserItem } from './components/UserItem'

export const UsersList = () => {
  const renderUsers = () =>
    users.map(({ id, name, position }) => (
      <Grid item key={id} md={3}>
        <UserItem name={name} position={position} />
      </Grid>
    ))

  return (
    <Grid container spacing={7}>
      {renderUsers()}
    </Grid>
  )
}
