import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Typography, Box } from '@material-ui/core'
import { UserItem } from './components/UserItem'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { getLoading, getUsers } from 'selectors/vilmates-page'
import SpinnerStyled from 'components/ui/spinner'
import { SearchField } from 'components/ui/search-field'
import { useSearch } from 'custom-hook/useSearch'
import { vilmatesPageGetUsersListRequest } from 'actions/vilmates-page'
import './UsersList.scss'

export const UsersList = () => {
  const dispatch = useDispatch()
  const users = useEqualSelector(getUsers)
  const isLoading = useEqualSelector(getLoading)
  const [value, setValue] = useState('')
  const filteredUsers = useSearch(users, value, 300)

  const handleChange = (event) => setValue(event.target.value)

  useEffect(() => {
    dispatch(vilmatesPageGetUsersListRequest())
  }, [])

  //todo: do not forget to ask what to if we have not any user
  const renderUsers = filteredUsers.length ? (
    filteredUsers.map(({ id, name, position }) => (
      <Grid item key={id} md={3}>
        <UserItem name={name} position={position} id={id} />
      </Grid>
    ))
  ) : (
    <Typography
      variant="h3"
      component="p"
      className="vilmate-page-no-users"
      style={{ padding: '20%' }}
    >
      No users found
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
