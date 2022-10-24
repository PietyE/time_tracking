import React, { forwardRef } from 'react'
import { TextField } from '@material-ui/core'
import styles from '../../PersonalInformationSection.module.scss'

export const DateCustomInput = forwardRef(
  ({ value, onClick, label, variant }, ref) => (
    <TextField
      inputRef={ref}
      label={label}
      onClick={onClick}
      variant={variant}
      className={styles.information_textField}
      value={value}
    />
  )
)
