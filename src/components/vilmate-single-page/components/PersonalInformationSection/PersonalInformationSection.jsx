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
import { useDispatch } from 'react-redux'
import { vilatesSinglePageUpdateUserInformationRequest } from '../../../../actions/vilmates-page'

export const PersonalInformationSection = ({ user }) => {
  const dispatch = useDispatch()
  const actualPersonalInformation = updateInformation(user, personalInformation)
  const fields = createInputField(actualPersonalInformation)
  const formik = useFormik({
    initialValues: fields,
  })

  const updateUserPersonalInformation = () => {
    console.log('id', user.id)
    console.log('values', formik.values)
    dispatch(
      vilatesSinglePageUpdateUserInformationRequest({
        id: user.id,
        ...formik.values,
      })
    )
  }

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
        onBlur={() => updateUserPersonalInformation()}
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
