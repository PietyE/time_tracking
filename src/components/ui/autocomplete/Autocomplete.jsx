import React from 'react'
import { Autocomplete as MUIAutocomplete } from '@material-ui/lab'
import { InputAdornment, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import styles from './Autocomplete.module.scss'

export const Autocomplete = ({
  placeholder,
  options,
  value,
  onChange,
  searchable,
  noOptionsText,
  startIcon,
  secondaryText,
  ...rest
}) => {
  const changeHandler = (event, newValue) => {
    newValue && onChange(newValue)
  }

  const startAdornment = startIcon ? (
    <InputAdornment position="start">{startIcon}</InputAdornment>
  ) : null

  return (
    <MUIAutocomplete
      options={options}
      value={value}
      onChange={changeHandler}
      closeIcon=""
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment,
            endAdornment: (
              <>
                <span className={styles.secondaryText}>{secondaryText}</span>
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      fullWidth
      autoComplete
      autoHighlight
      disablePortal
      blurOnSelect
      noOptionsText={noOptionsText}
      {...rest}
    />
  )
}

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  startIcon: PropTypes.node,
  secondaryText: PropTypes.string,
}
