import React, { useState } from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import {
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  List,
  TextField,
  Grid,
} from '@material-ui/core'
import { AboutInformation } from './components/AboutInformation'
import {
  createInputEditingMode,
  createInputField,
  personalInformation,
  toCorrectFormCase,
  updateInformation,
} from './mocks'
import styles from './PersonalInformationSection.module.scss'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { vilatesSinglePageUpdateUserInformationRequest } from 'actions/vilmates-page'
import { ReactComponent as CloseEditing } from 'images/vilmates/CloseEditingPersonalInfo.svg'
import { ReactComponent as Edit } from 'images/vilmates/EditPersonalInfo.svg'
import { ReactComponent as SaveEditing } from 'images/vilmates/SavePersonalInfo.svg'

export const PersonalInformationSection = ({ user }) => {
  const dispatch = useDispatch()
  const actualPersonalInformation = updateInformation(user, personalInformation)
  const fields = createInputField(actualPersonalInformation)
  const formik = useFormik({
    initialValues: fields,
  })
  const [editingState, setIsEditingState] = useState(
    createInputEditingMode(actualPersonalInformation)
  )

  const updateUserPersonalInformation = (userInfo) => {
    dispatch(
      vilatesSinglePageUpdateUserInformationRequest({
        id: user.id,
        ...userInfo,
      })
    )
  }

  const onStartEdit = (correctField) =>
    setIsEditingState({ ...editingState, [correctField]: true })

  const onEndEdit = (correctField) =>
    setIsEditingState({ ...editingState, [correctField]: false })

  const onSave = (correctField) => {
    if (formik.values[correctField] !== fields[correctField])
      updateUserPersonalInformation({
        [correctField]: formik.values[correctField],
      })
  }

  const onClose = (event, correctField) => {
    formik.handleReset(event)
    onEndEdit(correctField)
  }

  const renderListItems = actualPersonalInformation.map((information) => {
    const correctField = toCorrectFormCase(information.title)
    return (
      <ListItem key={information.text} className={styles.list_item}>
        <ListItemAvatar className={styles.avatar}>
          {information.icon}
        </ListItemAvatar>
        <TextField
          variant="outlined"
          label={information.title}
          name={correctField}
          value={formik.values[correctField]}
          className={styles.information_textField}
          onChange={formik.handleChange}
          onClick={() => onStartEdit(correctField)}
        />
        <Grid container alignItems="center" justifyContent="center">
          {editingState[correctField] ? (
            <>
              <Grid item className={styles.save}>
                <SaveEditing
                  onClick={() => {
                    onSave(correctField)
                    onEndEdit(correctField)
                  }}
                />
              </Grid>
              <Grid
                item
                className={styles.close}
                onClick={(event) => onClose(event, correctField)}
              >
                <CloseEditing />
              </Grid>
            </>
          ) : (
            <Grid item>
              <Edit />
            </Grid>
          )}
        </Grid>
      </ListItem>
    )
  })

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
