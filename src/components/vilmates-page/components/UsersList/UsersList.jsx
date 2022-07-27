import React from 'react'
import { Grid } from '@material-ui/core'
import { users } from 'mocks/users'
import { Container } from 'components/ui/container'
import { UserItem } from './components/UserItem'

export const UsersList = () => (
  <Grid container spacing={20}>
    {users.map((user) => (
      <Grid item key={user.id} md={3} sx={{ width: '210px' }}>
        <Container size="small">
          <UserItem user={user} />
        </Container>
      </Grid>
    ))}
  </Grid>
)
