import React from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import {
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  List,
  TextField,
} from '@material-ui/core'
import { AboutInformation } from './components/AboutInformation'
import {
  createInputField,
  personalInformation,
  toCorrectFormCase,
  updateInformation,
} from './mocks'
import styles from './PersonalInformationSection.module.scss'
import { useFormik } from 'formik'

export const PersonalInformationSection = ({ user }) => {
  const actualPersonalInformation = updateInformation(user, personalInformation)
  const fields = createInputField(actualPersonalInformation)
  const formik = useFormik({
    initialValues: fields,
  })

  const renderListItems = actualPersonalInformation.map((information) => (
    <ListItem key={information.text} className={styles.list_item}>
      <ListItemAvatar className={styles.avatar}>
        {information.icon}
      </ListItemAvatar>
      <TextField
        variant="outlined"
        label={information.title}
        name={toCorrectFormCase(information.title)}
        value={formik.values[toCorrectFormCase(information.title)]}
        className={styles.information_textField}
        onChange={formik.handleChange}
      />
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
