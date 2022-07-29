import React, { useCallback, useMemo, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { users } from 'mocks/users'
import { UserItem } from './components/UserItem'
import { SearchField } from 'components/ui/search-field'
// import { debounce } from 'lodash'
import './UsersList.scss'

export const UsersList = () => {
  const [value, setValue] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(users)

  const handleChange = (event) => setValue(event.target.value)

  const searchingUsers = useMemo(
    () =>
      filteredUsers.filter(({ name }) =>
        name.toLowerCase().trim().includes(value.toLowerCase().trim())
      ),
    [value]
  )

  const debounce = (func) => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  }

  const debounceChange = debounce(handleChange, 300)

  const renderUsers = () =>
    searchingUsers.map(({ id, name, position }) => (
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
          onChange={debounceChange}
        />
        <Typography>Reset filters</Typography>
      </Box>
      <Grid container spacing={7}>
        {renderUsers()}
      </Grid>
    </>
  )
}
