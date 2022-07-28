import React from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import { Box, TextField } from '@material-ui/core'

export const TimeInput = ({
  value,
  onChange,
  onFocus,
  mask,
  maskPlaceholder,
  placeholder,
  error,
}) => (
  <Box
    sx={{
      width: '57px',
      textAlign: 'center',
    }}
  >
    <InputMask
      placeholder={placeholder}
      maskPlaceholder={maskPlaceholder}
      value={value}
      onChange={onChange}
      mask={mask}
      onFocus={onFocus}
    >
      <TextField
        variant="outlined"
        fullWidth
        inputProps={{ style: { textAlign: 'center' } }}
        error={error}
      />
    </InputMask>
  </Box>
)

TimeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  mask: PropTypes.string,
  placeholder: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  error: PropTypes.bool,
}
