import React from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import { Box, Divider } from '@material-ui/core'
import { AboutInformation } from './components/AboutInformation'
import { personalInformation, updateInformation } from './mocks'
import styles from './PersonalInformationSection.module.scss'

export const PersonalInformationSection = ({ user }) => {
  const actualPersonalInformation = updateInformation(user, personalInformation)

  return (
    <RightSessionContainer title="Personal information">
      <Box className={styles.information}>
        <Divider />
      </Box>
      <AboutInformation />
    </RightSessionContainer>
  )
}
