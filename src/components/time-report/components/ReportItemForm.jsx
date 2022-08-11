import React from 'react'
import PropTypes from 'prop-types'
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Textarea from 'components/ui/textarea'
import TimeInput from 'components/ui/timeInput'

const useStyles = makeStyles((theme) => ({
  button: {
    flexBasis: '5%',
    flexShrink: 0,
    minWidth: 41,
    height: 42,
    padding: 0,
    '&.Mui-disabled': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  },
  icon: {
    fontSize: 17,
  },
  form: {
    flexBasis: '75%',
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputRoot: {
    flexBasis: '75%',
    minHeight: 42,
    '& .MuiOutlinedInput-root.Mui-disabled': {
      paddingLeft: 0,
      color: theme.palette.secondary.contrastText,
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  },
  timeInputRoot: {
    flexBasis: '5%',
    flexShrink: 0,
    height: 42,
    minWidth: 57,
    margin: '0 8px',
    '& .MuiOutlinedInput-root.Mui-disabled': {
      color: theme.palette.secondary.contrastText,
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  },
}))

const ReportItemForm = ({
  textInputValue,
  textInputPlaceholder,
  handleTextInputChange,
  handleTextInputFocus,
  handleTextInputBlur,
  textInputError,
  textInputAutofocus,

  timeInputValue,
  timeInputPlaceholder,
  timeInputMaskPlaceholder,
  timeInputMask,
  handleTimeInputChange,
  handleTimeInputFocus,
  handleTimeInputBlur,
  timeInputError,

  isSubmitButtonDisabled,
  handleFormSubmit,
  handleFormFocus,
  handleFormBlur,
  onButtonClick,
  isEditing,
}) => {
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={handleFormSubmit} onFocus={handleFormFocus} onBlur={handleFormBlur}>
      <Box className={classes.root}>
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
            root: classes.textInputRoot,
          }}
          autoFocus={textInputAutofocus}
          disabled={!isEditing}
        />
        <TimeInput
          value={timeInputValue}
          placeholder={timeInputPlaceholder}
          maskPlaceholder={timeInputMaskPlaceholder}
          mask={timeInputMask}
          onChange={handleTimeInputChange}
          onFocus={handleTimeInputFocus}
          onBlur={handleTimeInputBlur}
          error={timeInputError}
          classes={{
            root: classes.timeInputRoot,
          }}
          disabled={!isEditing}
        />

        {isEditing ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitButtonDisabled}
            className={classes.button}
          >
            <FontAwesomeIcon icon={faCheck} className={classes.icon} />
          </Button>
        ) : (
          <Button
            variant="text"
            className={classes.button}
            onClick={onButtonClick}
          >
            <FontAwesomeIcon icon={faEllipsisV} className={classes.icon} />
          </Button>
        )}
      </Box>
    </form>
  )
}

export default ReportItemForm

ReportItemForm.defaultProps = {
  isEditing: true,
}

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
  timeInputPlaceholder: PropTypes.string,
  timeInputMaskPlaceholder: PropTypes.string,
  timeInputMask: PropTypes.string,
  handleTimeInputChange: PropTypes.func,
  handleTimeInputFocus: PropTypes.func,
  handleTimeInputBlur: PropTypes.func,
  timeInputError: PropTypes.bool,

  isSubmitButtonDisabled: PropTypes.bool,
  handleFormSubmit: PropTypes.func,
  handleFormFocus: PropTypes.func,
  handleFormBlur: PropTypes.func,
  onButtonClick: PropTypes.func,
  isEditing: PropTypes.bool,
}
