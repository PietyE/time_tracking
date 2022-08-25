import React from 'react'
import { ListItemText } from '@material-ui/core'

export const renderUsersAndSortByName = (users) =>
  users
    .sort((name1, name2) => {
      if (name1 < name2) {
        return -1
      }
      if (name1 > name2) {
        return 1
      }
      return 0
    })
    .map((user) => (
      <ListItemText
        key={user}
        primary={user}
        primaryTypographyProps={{
          noWrap: true,
        }}
      />
    ))
