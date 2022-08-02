import React from 'react'
import PropTypes from 'prop-types'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Textarea from 'components/ui/textarea'
import TimeInput from 'components/ui/timeInput'

const useStyles = makeStyles((theme) => ({
  button: {
    flexBasis: 41,
    flexShrink: 0,
    height: 42,
    padding: 0,
    minWidth: 0,
    '&.Mui-disabled': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  },
  icon: {
    fontSize: 22,
  },
  form: {
    flexBasis: '75%',
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  textInputRoot: {
    flexBasis: '100%',
    flexShrink: 1,
    minHeight: 42,
    marginRight: 50,
  },
  timeInputRoot: {
    flexBasis: 57,
    flexShrink: 0,
    height: 42,
    marginRight: 35,
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

  isButtonDisabled,
  handleFormSubmit,
}) => {
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={handleFormSubmit}>
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
          classes={{ root: classes.textInputRoot }}
          autoFocus={textInputAutofocus}
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
          classes={{ root: classes.timeInputRoot }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isButtonDisabled}
          className={classes.button}
        >
          <FontAwesomeIcon icon={faCheck} className={classes.icon} />
        </Button>
      </Box>
    </form>
  )
}

export default ReportItemForm

ReportItemForm.propTypes = {
  textInputValue: PropTypes.string.isRequired,
  textInputPlaceholder: PropTypes.string,
  handleTextInputChange: PropTypes.func.isRequired,
  handleTextInputFocus: PropTypes.func,
  handleTextInputBlur: PropTypes.func,
  textInputError: PropTypes.bool,
  textInputAutofocus: PropTypes.bool,

  timeInputValue: PropTypes.string.isRequired,
  timeInputPlaceholder: PropTypes.string,
  timeInputMaskPlaceholder: PropTypes.string,
  timeInputMask: PropTypes.string,
  handleTimeInputChange: PropTypes.func.isRequired,
  handleTimeInputFocus: PropTypes.func,
  handleTimeInputBlur: PropTypes.func,
  timeInputError: PropTypes.bool,

  isButtonDisabled: PropTypes.bool,
  handleFormSubmit: PropTypes.func.isRequired,
}
