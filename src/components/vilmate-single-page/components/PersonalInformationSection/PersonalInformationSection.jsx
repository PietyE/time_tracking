import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
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
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { AboutInformation } from './components/AboutInformation'
import { toCorrectFormCase } from './mocks'
import { ReactComponent as CloseEditing } from 'images/vilmates/CloseEditingPersonalInfo.svg'
import { ReactComponent as Edit } from 'images/vilmates/EditPersonalInfo.svg'
import { ReactComponent as SaveEditing } from 'images/vilmates/SavePersonalInfo.svg'
import { RightSessionContainer } from '../RightSessionsContainer'
import { showAlert } from 'actions/alert'
import { WARNING_ALERT } from 'constants/alert-constant'
import { DateCustomInput } from './components/DateCustomInput'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './PersonalInformationSection.module.scss'
import useShallowEqualSelector from '../../../../custom-hook/useShallowEqualSelector'
import { getUserPermissions } from '../../../../selectors/user'
import { userPermissions } from '../../../../constants/permissions'

export const PersonalInformationSection = ({
  fields,
  actualPersonalInformation,
  editingState,
  setIsEditingState,
  updateUserPersonalInformation,
  errorsState,
  setErrorState,
}) => {
  const formik = useFormik({
    initialValues: fields,
  })
  const dispatch = useDispatch()
  const permissions = useShallowEqualSelector(getUserPermissions)

  const canEditInfo = permissions?.includes(userPermissions.users_change_user)

  const onStartEdit = (correctField) =>
    setIsEditingState({ ...editingState, [correctField]: true })

  const onEndEdit = (correctField) =>
    setIsEditingState({ ...editingState, [correctField]: false })

  const onSave = (correctField, validationRule, message) => {
    if (!validationRule.test(formik.values[correctField])) {
      formik.values[correctField] = fields[correctField]
      setErrorState({ ...errorsState, [correctField]: true })
      dispatch(
        showAlert({
          type: WARNING_ALERT,
          title: 'Validation Error',
          message: message,
          delay: 4000,
        })
      )
      return
    }
    if (
      formik.values[correctField] !== fields[correctField] ||
      errorsState[correctField]
    ) {
      setErrorState({ ...errorsState, [correctField]: false })
      updateUserPersonalInformation(
        {
          [correctField]: formik.values[correctField],
        },
        correctField
      )
    }
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
        {!(correctField === 'date_of_birth') ? (
          <TextField
            variant="outlined"
            label={information.title}
            name={correctField}
            value={formik.values[correctField]}
            className={styles.information_textField}
            onChange={formik.handleChange}
            onFocus={() => onStartEdit(correctField)}
            error={errorsState[correctField]}
            disabled={!canEditInfo}
            onBlur={(event) => {
              if (event?.relatedTarget?.id === `button-close-${correctField}`) {
                onClose(event, correctField)
                return
              }
              onSave(
                correctField,
                information?.validationRule,
                information?.message
              )
              onEndEdit(correctField)
            }}
          />
        ) : (
          <DatePicker
            dateFormat="yyyy-MM-dd"
            disabled={!canEditInfo}
            selected={new Date(formik.values[correctField])}
            maxDate={moment().toDate()}
            onChange={(date) => {
              formik.setFieldValue(
                correctField,
                moment(date).format('yyyy-MM-DD')
              )
            }}
            onCalendarClose={() =>
              onSave(
                correctField,
                information?.validationRule,
                information?.message
              )
            }
            customInput={
              <DateCustomInput
                variant="outlined"
                label={information.title}
                disabled={canEditInfo}
              />
            }
          />
        )}
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
        {/*<Divider />*/}
      </Box>
      {/*<AboutInformation />*/}
    </RightSessionContainer>
  )
}
