import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { OCCUPATION } from 'constants/vilmates-page'
import React, { useMemo } from 'react'
import styles from './DeveloperOccupationRadioGroup.module.scss'

const { PART_TIME, FULL_TIME } = OCCUPATION

export const DeveloperOccupationRadioGroup = ({ onChange, isFullTime }) => {
  const occupationValue = useMemo(
    () => (isFullTime === false ? PART_TIME : FULL_TIME),
    [isFullTime]
  )

  const changeHandler = (e) => {
    onChange(e.target.value === FULL_TIME)
  }

  return (
    <RadioGroup
      aria-label="occupation"
      name="occupation"
      value={occupationValue}
      onChange={changeHandler}
    >
      <FormControlLabel
        className={styles.label}
        value={FULL_TIME}
        control={<Radio />}
        label={FULL_TIME}
      />
      <FormControlLabel
        className={styles.label}
        value={PART_TIME}
        control={<Radio />}
        label={PART_TIME}
      />
    </RadioGroup>
  )
}
