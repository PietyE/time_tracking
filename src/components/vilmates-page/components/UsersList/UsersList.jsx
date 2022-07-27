import React from 'react'
import { Grid } from '@material-ui/core'
import { users } from 'mocks/users'
import { UserItem } from './components/UserItem'

export const UsersList = () => (
  <Grid container spacing={7}>
    {users.map((user) => (
      <Grid item key={user.id} md={3}>
        <UserItem name={user.name} position={user.position} />
      </Grid>
    ))}
  </Grid>
)
