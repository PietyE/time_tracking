import React from 'react'
import { Box, List, Typography } from '@material-ui/core'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getUsers } from 'selectors/google-auth-success'
import { renderUsersAndSortByName } from './helpers'

export const GoogleModalContent = () => {
  const { in_db: fromDb, in_sheet: fromSheet } =
    useShallowEqualSelector(getUsers)

  return (
    <Box className="modal-container-form-users-sync-list-container">
      <List className="modal-container-form-users-sync-list-container-database">
        <Typography
          style={{ fontWeight: '600' }}
          variant="h6"
          component="p"
          gutterBottom
        >
          Database
        </Typography>
        {renderUsersAndSortByName(fromDb)}
      </List>
      <List className="modal-container-form-users-sync-list-container-google-sheet">
        <Typography
          style={{ fontWeight: '600' }}
          variant="h6"
          component="p"
          gutterBottom
        >
          GoogleSheet
        </Typography>
        {renderUsersAndSortByName(fromSheet)}
      </List>
    </Box>
  )
}
