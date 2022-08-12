import React from 'react'
import { Box, List, Typography } from '@material-ui/core'
import { users } from '../mocks/users'
import { renderUsersFromDatabase } from './helpers'

export const GoogleModalContent = () => (
  <Box className="modal-container-form-users-sync-list-container">
    <List className="modal-container-form-users-sync-list-container-database">
      {renderUsersFromDatabase(
        users.database,
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
        users.google_sheet,
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
