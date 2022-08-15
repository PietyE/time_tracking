import React, { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { UserItem } from './components/UserItem'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { getLoading, getUsers } from 'selectors/vilmates-page'
import SpinnerStyled from 'components/ui/spinner'
import { SearchField } from 'components/ui/search-field'
import { vilmatesPageGetUsersListRequest } from 'actions/vilmates-page'
import { useApiSearch } from 'custom-hook/useApiSearch'
import './UsersList.scss'

export const UsersList = () => {
  const users = useEqualSelector(getUsers)
  const isLoading = useEqualSelector(getLoading)
  const [value, setValue] = useState('')
  useApiSearch(value, 500, vilmatesPageGetUsersListRequest)

  const handleChange = (event) => setValue(event.target.value)

  const renderUsers = users.length ? (
    users.map((user) => (
      <Grid item key={user.id} md={3}>
        <UserItem user={user} />
      </Grid>
    ))
  ) : (
    <Typography
      variant="h3"
      component="p"
      className="vilmate-page-no-users"
      style={{ padding: '20%' }}
    >
      Not found users
    </Typography>
  )

  return !isLoading ? (
    <>
      <Box className="vilmate-action-var-container">
        <SearchField
          placeholder="Search by name"
          value={value}
          onChange={handleChange}
        />
      </Box>
      <Grid container spacing={7}>
        {renderUsers}
      </Grid>
    </>
  ) : (
    <SpinnerStyled />
  )
}
