import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { useState } from 'react'

export const Textarea = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  placeholder,
  minRows,
  maxRows,
  maxLength,
  fullWidth,
  error,
  autoFocus,
  classes,
  name,
  disabled,
  ...rest
}) => {
  const [maxLengthHelperText, setMaxLengthHelperText] = useState(' ')
  const [maxLengthError, setMaxLengthError] = useState(false)

  const handleKeyDown = (event) => {
    // TODO: Make normal validation with yup or any of the analogies
    if (value.length === maxLength) {
      setMaxLengthHelperText(`Field length cannot exceed ${maxLength} characters!`)
      setMaxLengthError(true)
    }

    if (event.which === 13 && !event.shiftKey) {
      event.preventDefault()
      onSubmit(event)
    }
  }

  const handleKeyUp = () => {
    if (value.length < maxLength) {
      setMaxLengthHelperText(' ')
      setMaxLengthError(false)
    }
  }

  return (
    <TextField
      name={name}
      variant="outlined"
      color="secondary"
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
      multiline
      type="text"
      fullWidth={fullWidth}
      placeholder={placeholder}
      maxRows={maxRows}
      minRows={minRows}
      maxLength={maxLength}
      inputProps={{
        maxLength: maxLength,
      }}
      error={maxLengthError || error}
      autoFocus={autoFocus}
      classes={classes}
      disabled={disabled}
      helperText={maxLengthHelperText}
      {...rest}
    />
  )
}

Textarea.defaultProps = {
  maxRows: 10,
  minRows: 1,
}

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  fullWidth: PropTypes.bool,
  multiline: PropTypes.bool,
  maxLength: PropTypes.number,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  classes: PropTypes.object,
}
