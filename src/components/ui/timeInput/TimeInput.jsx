import React from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import { TextField } from '@material-ui/core'

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
  ...rest
}) => (
  <InputMask
    placeholder={placeholder}
    maskPlaceholder={maskPlaceholder}
    value={value}
    onChange={onChange}
    mask={mask}
    onFocus={onFocus}
    onBlur={onBlur}
    {...rest}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  mask: PropTypes.string,
  placeholder: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  error: PropTypes.bool,
  classes: PropTypes.object,
}
