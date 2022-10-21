import React from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
} from '@material-ui/core'
import { AboutInformation } from './components/AboutInformation'
import { toCorrectFormCase } from './mocks'
import { useFormik } from 'formik'
import { ReactComponent as CloseEditing } from 'images/vilmates/CloseEditingPersonalInfo.svg'
import { ReactComponent as Edit } from 'images/vilmates/EditPersonalInfo.svg'
import { ReactComponent as SaveEditing } from 'images/vilmates/SavePersonalInfo.svg'
import styles from './PersonalInformationSection.module.scss'

export const PersonalInformationSection = ({
  fields,
  actualPersonalInformation,
  editingState,
  setIsEditingState,
  updateUserPersonalInformation,
}) => {
  const formik = useFormik({
    initialValues: fields,
  })

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
    formik.values[correctField] = fields[correctField]
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
          onFocus={() => onStartEdit(correctField)}
          onBlur={(event) => {
            if (event?.relatedTarget?.id === `button-close-${correctField}`) {
              onClose(event, correctField)
              return
            }
            onSave(correctField)
            onEndEdit(correctField)
          }}
        />
        <Grid container alignItems="center" justifyContent="center">
          {editingState[correctField] ? (
            <>
              <Grid item>
                <Button className={styles.save}>
                  <SaveEditing />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  id={`button-close-${correctField}`}
                  className={styles.close}
                  onClick={(event) => {
                    onClose(event, correctField)
                  }}
                >
                  <CloseEditing />
                </Button>
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
