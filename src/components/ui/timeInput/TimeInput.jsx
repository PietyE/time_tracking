import React from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import { TextField } from '@material-ui/core'

export const TimeInput = ({ value, onChange, onFocus }) => (
  <InputMask
    placeholder="0:00"
    maskPlaceholder="0"
    value={value}
    onChange={onChange}
    mask="9:99"
    onFocus={onFocus}
  >
    <TextField variant='outlined' fullWidth />
  </InputMask>
)

TimeInput.defaultProps = {}

TimeInput.propTypes = {}
