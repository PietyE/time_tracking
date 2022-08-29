import React from 'react'
import { Box, List, Typography } from '@material-ui/core'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getUsers } from 'selectors/google-auth-success'
import { renderUsersAndSortByName } from './helpers'

export const GoogleModalContent = () => {
  const { in_db: fromDb, in_sheet: fromSheet } =
    useShallowEqualSelector(getUsers)
  const usersAmount = (users) => (users.length ? `(${users.length})` : '')

  return (
    <Box className="modal-container-form-users-sync-list-container">
      <List className="modal-container-form-users-sync-list-container-database">
        <Typography
          style={{ fontWeight: '600', marginBottom: '1.5rem' }}
          variant="h6"
          component="p"
        >
          Database {usersAmount(fromDb)}
        </Typography>
        {renderUsersAndSortByName(fromDb)}
      </List>
      <List className="modal-container-form-users-sync-list-container-google-sheet">
        <Typography
          style={{ fontWeight: '600', marginBottom: '1.5rem' }}
          variant="h6"
          component="p"
          gutterBottom
        >
          Google Sheet {usersAmount(fromSheet)}
        </Typography>
        {renderUsersAndSortByName(fromSheet)}
      </List>
    </Box>
  )
}
