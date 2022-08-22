import React from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import {
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from '@material-ui/core'
import { AboutInformation } from './components/AboutInformation'
import { personalInformation, updateInformation } from './mocks'
import styles from './PersonalInformationSection.module.scss'

export const PersonalInformationSection = ({ user }) => {
  const actualPersonalInformation = updateInformation(user, personalInformation)

  const renderListItems = actualPersonalInformation.map((information) => (
    <ListItem key={information.text} className={styles.list_item}>
      <ListItemAvatar className={styles.avatar}>
        {information.icon}
      </ListItemAvatar>
      <ListItemText primary={information.title} secondary={information.text} />
    </ListItem>
  ))

  return (
    <RightSessionContainer title="Personal information">
      <Box className={styles.information}>
        <List className={styles.list}> {renderListItems}</List>
        <Divider />
      </Box>
      <AboutInformation />
    </RightSessionContainer>
  )
}
