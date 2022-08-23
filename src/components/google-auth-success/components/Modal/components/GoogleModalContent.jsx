import React from 'react'
import { Box, List, Typography } from '@material-ui/core'
import { renderUsersFromDatabase } from './helpers'
import useShallowEqualSelector from '../../../../../custom-hook/useShallowEqualSelector'
import { getUsers } from '../../../../../selectors/google-auth-success'

export const GoogleModalContent = () => {
  const users = useShallowEqualSelector(getUsers)
  console.log(users)
  return (
    <Box className="modal-container-form-users-sync-list-container">
      <List className="modal-container-form-users-sync-list-container-database">
        {renderUsersFromDatabase(
          users.in_db,
          <Typography
            style={{ fontWeight: '600' }}
            variant="h6"
            component="p"
            gutterBottom
          >
            Database
          </Typography>
        )}
      </List>
      <List className="modal-container-form-users-sync-list-container-google-sheet">
        {renderUsersFromDatabase(
          users.in_sheet,
          <Typography
            style={{ fontWeight: '600' }}
            variant="h6"
            component="p"
            gutterBottom
          >
            GoogleSheet
          </Typography>
        )}
      </List>
    </Box>
  )
}
