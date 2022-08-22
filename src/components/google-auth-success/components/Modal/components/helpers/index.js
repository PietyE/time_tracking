import React from 'react'
import { ListItem } from '@material-ui/core'

export const renderUsersFromDatabase = (users, title) => {
  const listOfUsers = [title]
  for (let key in users) {
    listOfUsers.push(<ListItem>{users[key]}</ListItem>)
  }
  return listOfUsers
}
