import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { PageHeader } from 'components/common/PageHeader'
import { Container } from 'components/ui/container'
import { vilmatesPageSelectUserRequest } from 'actions/vilmates-page'
import { getSelectedUser, isSelectedUserLoading } from 'selectors/vilmates-page'
import { ReactComponent as Back } from 'images/vilmates/backArrow.svg'
import SpinnerStyled from 'components/ui/spinner'
import { PersonalInformationSection } from './components/PersonalInformationSection'
import useFetchUserById from './components/helpers/useFetchUser'
import { PhotoSection } from './components/PhotoSection'
import { CommentsSection } from './components/CommentsSection'
import { ProjectsSection } from './components/ProjectsSection'
import styles from './VilmatesSinglePage.module.scss'

export const VilmateSinglePage = () => {
  const [user, isLoading] = useFetchUserById(
    vilmatesPageSelectUserRequest,
    getSelectedUser,
    isSelectedUserLoading
  )

  const isUserFound = user ? (
    <Box style={{ display: 'flex' }}>
      <Box className={styles.left_container}>
        <PhotoSection name={user.name} role={user.position} />
        <ProjectsSection />
      </Box>
      <Box className={styles.right_container}>
        <PersonalInformationSection user={user} />
        <CommentsSection />
      </Box>
    </Box>
  ) : (
    <Typography variant="h6" style={{ padding: '20%' }}>
      No found user by this id
    </Typography>
  )

  return (
    <Container>
      <PageHeader name="Vilmates" />
      {isLoading ? (
        <SpinnerStyled />
      ) : (
        <>
          <Box className={styles.go_back}>
            <Back /> <Link to="/vilmates">Back to people list</Link>
          </Box>
          {isUserFound}
        </>
      )}
    </Container>
  )
}
