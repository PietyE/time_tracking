import { Button, Paper } from '@material-ui/core'
import Autocomplete from 'components/ui/autocomplete'
import SelectMonth from 'components/ui/select-month'
import SliderSelect from 'components/ui/sliderSelect'
import { DEVELOPER } from 'constants/role-constant'

import React, { useMemo, useState, useEffect } from 'react'

import { parseMinToHoursAndMin } from 'utils/common'
import CreateReportForm from '../components/CreateReportForm'
import ReportItem from '../components/ReportItem'
import Spinner from '../components/Spinner'
import styles from './TimeReportMobile.module.scss'

import { ReactComponent as ExportIcon } from 'images/timereport/export-icon.svg'
import { ReactComponent as PeopleIcon } from 'images/timereport/people-icon.svg'
import { ReactComponent as WindowIcon } from 'images/timereport/window-icon.svg'

export const TimeReportMobile = ({
  isFetchingReports,
  totalHours,
  roleUser,
  developersList,
  selectedDeveloper,
  projects,
  selectProject,
  selectedProject,
  selectedDate,
  changeSelectedDateTimeReport,
  handlerExportCsv,
  reports,
  renderDaysArray,
  addTimeReport,
  selectDevelopers,
  selectedProjectHours,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const isSelectedProjectChosen = useMemo(
    () => !!Object.entries(selectedProject).length,
    [selectedProject]
  )

  const optionsForDaySelectSlider = useMemo(
    () =>
      renderDaysArray.map((item, index) => {
        const numberOfDay = index + 1
        const baseDate = new Date(
          Date.UTC(selectedDate.year, selectedDate.month, numberOfDay)
        )
        return {
          label: baseDate.toLocaleDateString('en', {
            weekday: 'short',
          }),
          value: numberOfDay,
        }
      }),
    [renderDaysArray]
  )

  const inputFocusHandler = () => {
    setIsInputFocused(true)
  }

  const inputBlurHandler = () => {
    setIsInputFocused(false)
  }

  const getDayNumber = () => {
    const date = new Date()
    if (
      selectedDate.month === date.getMonth() &&
      selectedDate.year === date.getFullYear()
    ) {
      return date.getDate()
    }
    return 1
  }

  const [selectedDayNumber, setSelectedDayNumber] = useState(getDayNumber)

  const dataOfDay = reports?.filter(
    (report) => selectedDayNumber === new Date(report.date).getDate()
  )

  const sumHours = dataOfDay?.reduce(
    (sum, item) => (sum = sum + item.duration),
    0
  )

  const footerStyles = `${styles.footer} ${isInputFocused && styles.hidden}`

  useEffect(() => {
    const newDayNumber = getDayNumber()
    setSelectedDayNumber(newDayNumber)
  }, [selectedDate])

  if (isFetchingReports || !isSelectedProjectChosen) {
    return <Spinner />
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.filters}>
          <SelectMonth
            value={selectedDate}
            onChange={changeSelectedDateTimeReport}
            showYear
          />

          <div className={styles.buttonWrapper}>
            <Button
              onClick={handlerExportCsv}
              variant="contained"
              color="primary"
              startIcon={<ExportIcon />}
              fullWidth
            >
              Export in XLSX
            </Button>
          </div>

          {roleUser !== DEVELOPER && (
            <Autocomplete
              options={developersList}
              value={selectedDeveloper}
              onChange={selectDevelopers}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              startIcon={<WindowIcon />}
              secondaryText={parseMinToHoursAndMin(selectedProjectHours, true)}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
          )}
          <Autocomplete
            options={projects}
            value={selectedProject}
            onChange={selectProject}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value?.id}
            startIcon={<PeopleIcon />}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>

        <SliderSelect
          options={optionsForDaySelectSlider}
          selectedValue={selectedDayNumber}
          onChange={setSelectedDayNumber}
          initialSlide={selectedDayNumber - 1}
        />

        <div className={styles.reportItemsSection}>
          <Paper className={styles.createReportForm}>
            <CreateReportForm
              addTimeReport={addTimeReport}
              numberOfDay={selectedDayNumber}
              selectedDate={selectedDate}
              sumHours={sumHours}
              handleFormFocus={inputFocusHandler}
              handleFormBlur={inputBlurHandler}
            />
          </Paper>
          <div className={styles.createdReportsContainer}>
            {dataOfDay?.map(({ title, duration, id }, index) => (
              <ReportItem
                key={id}
                index={index}
                text={title}
                hours={duration}
                id={id}
                isOneProject={projects.length > 1}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className={footerStyles}>
        Total hours spend this month:
        <span>{parseMinToHoursAndMin(totalHours, true)}</span>
      </footer>
    </>
  )
}
