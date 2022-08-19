import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { vilmatesPageChangeUserOnProjectRequest } from 'actions/vilmates-page'
import { OCCUPATION } from 'constants/vilmates-page'
import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './DeveloperOccupationRadioGroup.module.scss'

const { PART_TIME, FULL_TIME } = OCCUPATION

export const DeveloperOccupationRadioGroup = ({ onChange, isFullTime }) => {
  // const dispatch = useDispatch()
  // const [isFullTime, setIsFullTime] = useState(isFullTimeValue)
  // const occupationValue = useMemo(
  //   () => (isFullTime ? FULL_TIME : PART_TIME),
  //   [isFullTime]
  // )

  // const changeDeveloperOccupation = (developerProjectId, isFullTime) => {
  //   dispatch(
  //     vilmatesPageChangeUserOnProjectRequest({
  //       developerProjectId,
  //       data: { is_full_time: isFullTime },
  //     })
  //   )
  // }

  const occupationValue = useMemo(
    () => (isFullTime === false ? PART_TIME : FULL_TIME
      ),
    [isFullTime]
  )

  // const handleOccupationTypeChange = () => {
  //   changeDeveloperOccupation(developerProjectId, !isFullTime)
  //   setIsFullTime((prevValue) => !prevValue)
  // }

  const changeHandler = (e) => {
    onChange(e.target.value === FULL_TIME);
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
        value={PART_TIME}
        control={<Radio />}
        label={PART_TIME}
      />
      <FormControlLabel
        className={styles.label}
        value={FULL_TIME}
        control={<Radio />}
        label={FULL_TIME}
      />
    </RadioGroup>
  )
}
