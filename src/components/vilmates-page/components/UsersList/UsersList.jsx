import React from 'react'
import { Box, Grid, TextField, Typography } from '@material-ui/core'
import { users } from 'mocks/users'
import { UserItem } from './components/UserItem'
import { SearchField } from 'components/ui/search-field'
import './UsersList.scss'

export const UsersList = () => {
  const renderUsers = () =>
    users.map(({ id, name, position }) => (
      <Grid item key={id} md={3}>
        <UserItem name={name} position={position} />
      </Grid>
    ))

  return (
    <>
      <Box className="vilmate-action-var-container">
        <SearchField placeholder="Search by name" />
        <Typography>Reset filters</Typography>
      </Box>
      <Grid container spacing={7}>
        {renderUsers()}
      </Grid>
    </>
  )
}
