import React from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import { Box, TextField } from '@material-ui/core'

export const TimeInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  mask,
  maskPlaceholder,
  placeholder,
  error,
  classes,
}) => (
  <InputMask
    placeholder={placeholder}
    maskPlaceholder={maskPlaceholder}
    value={value}
    onChange={onChange}
    mask={mask}
    onFocus={onFocus}
    onBlur={onBlur}
  >
    <TextField
      variant="outlined"
      fullWidth
      inputProps={{ style: { textAlign: 'center' } }}
      error={error}
      classes={classes}
    />
  </InputMask>
)

TimeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  mask: PropTypes.string,
  placeholder: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  error: PropTypes.bool,
  classes: PropTypes.object,
}
