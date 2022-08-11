import React, { useState } from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core'
import { AboutInformation } from './components/AboutInformation/AboutInformation'
import { personalInformation, updateInformation } from './mocks'
import styles from './PersonalInformationSection.module.scss'

export const PersonalInformationSection = ({ user }) => {
  const actualPersonalInformation = updateInformation(user, personalInformation)
  const [disabled, setDisabled] = useState({
    slack: false,
    email: false,
    phone: false,
    reports_to: false,
    location: false,
    calendar: false,
  })

  console.log(disabled)

  const renderListItems = actualPersonalInformation.map((information) => (
    <ListItem
      key={information.text}
      className={styles.list_item}
      onClick={() => setDisabled(!disabled)}
    >
      <ListItemAvatar className={styles.avatar}>
        {information.icon}
      </ListItemAvatar>
      <Box className={styles.info_text}>
        <TextField
          disabled={disabled[information.title]}
          onBLur={() =>
            setDisabled((prevState) => ({
              ...prevState,
              [information.title.toLowerCase()]:
                !prevState[information.title.toLowerCase()],
            }))
          }
          label={information.title}
          variant={
            !disabled[information.title.toLowerCase()] ? 'outlined' : 'standard'
          }
        />
      </Box>
    </ListItem>
  ))

  return (
    <RightSessionContainer title="Personal information">
      <Box className={styles.information}>
        <List className={styles.list}>{renderListItems}</List>
        <Divider />
      </Box>
      <AboutInformation />
    </RightSessionContainer>
  )
}
