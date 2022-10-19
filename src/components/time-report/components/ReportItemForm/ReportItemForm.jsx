import React from 'react'
import PropTypes from 'prop-types'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Tooltip } from '@material-ui/core'
import Textarea from 'components/ui/textarea'
import TimeInput from 'components/ui/timeInput'
import styles from './ReportItemForm.module.scss'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getUserPermissions } from 'selectors/user'
import { userPermissions } from '../../../../constants/permissions'
const ReportItemForm = ({
  textInputValue,
  textInputPlaceholder,
  handleTextInputChange,
  handleTextInputFocus,
  handleTextInputBlur,
  textInputError,
  textInputAutofocus,
  timeInputValue,
  handleTimeInputChange,
  handleTimeInputFocus,
  handleTimeInputBlur,
  timeInputError,
  isSubmitButtonDisabled,
  handleFormSubmit,
}) => {
  const tooltipTitle = isSubmitButtonDisabled
    ? 'You need to fill all the blank fields'
    : 'Save'

  const permissions = useShallowEqualSelector(getUserPermissions)

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <Textarea
        fullWidth
        value={textInputValue}
        placeholder={textInputPlaceholder}
        onChange={handleTextInputChange}
        onSubmit={handleFormSubmit}
        onFocus={handleTextInputFocus}
        onBlur={handleTextInputBlur}
        error={textInputError}
        classes={{
          root: styles.textInput,
        }}
        autoFocus={textInputAutofocus}
        maxLength={1000}
      />
      <TimeInput
        value={timeInputValue}
        placeholder="0:00"
        maskPlaceholder="0"
        mask="9:99"
        onChange={handleTimeInputChange}
        onFocus={handleTimeInputFocus}
        onBlur={handleTimeInputBlur}
        error={timeInputError}
        classes={{
          root: styles.timeInput,
        }}
      />
      {permissions?.includes(userPermissions.work_items_add_workitem) && (
        <Tooltip title={tooltipTitle} placement="top" arrow>
          <span>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitButtonDisabled}
              className={styles.button}
            >
              <FontAwesomeIcon icon={faCheck} className={styles.icon} />
            </Button>
          </span>
        </Tooltip>
      )}
    </form>
  )
}
export default ReportItemForm
ReportItemForm.propTypes = {
  textInputValue: PropTypes.string.isRequired,
  textInputPlaceholder: PropTypes.string,
  handleTextInputChange: PropTypes.func,
  handleTextInputFocus: PropTypes.func,
  handleTextInputBlur: PropTypes.func,
  textInputError: PropTypes.bool,
  textInputAutofocus: PropTypes.bool,
  timeInputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  handleTimeInputChange: PropTypes.func,
  handleTimeInputFocus: PropTypes.func,
  handleTimeInputBlur: PropTypes.func,
  timeInputError: PropTypes.bool,
  isSubmitButtonDisabled: PropTypes.bool,
  handleFormSubmit: PropTypes.func,
}
