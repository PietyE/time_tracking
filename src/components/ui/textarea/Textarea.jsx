import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

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
  ...rest
}) => {
  const handleKeyDown = (event) => {
    if (event.which === 13 && !event.shiftKey) {
      event.preventDefault()
      onSubmit(event)
    }
  }

  return (
    <TextField
      variant="outlined"
      color="secondary"
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      multiline={true}
      type="text"
      fullWidth={fullWidth}
      placeholder={placeholder}
      maxRows={maxRows}
      minRows={minRows}
      maxLength={maxLength}
      inputProps={{
        maxLength: maxLength,
      }}
      error={error}
      autoFocus={autoFocus}
      classes={classes}
      {...rest}
    />
  )
}

Textarea.defaultProps = {
  disabled: false,
  fullWidth: false,
  multiline: false,
  autoFocus: false,
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
