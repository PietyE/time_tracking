import React, { useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import { users } from 'mocks/users'
import { UserItem } from './components/UserItem'
import { SearchField } from 'components/ui/search-field'
import { useSearch } from 'custom-hook/useSearch'
import './UsersList.scss'

export const UsersList = () => {
  const [value, setValue] = useState('')
  const [filteredUsers] = useSearch(users, value)

  const handleChange = (event) => setValue(event.target.value)

  const renderUsers = () =>
    filteredUsers.map(({ id, name, position }) => (
      <Grid item key={id} md={3}>
        <UserItem name={name} position={position} />
      </Grid>
    ))

  return (
    <>
      <Box className="vilmate-action-var-container">
        <SearchField
          placeholder="Search by name"
          value={value}
          onChange={handleChange}
        />
      </Box>
      <Grid container spacing={7}>
        {renderUsers()}
      </Grid>
    </>
  )
}
