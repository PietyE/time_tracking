import { Box, Typography } from '@material-ui/core'
import { vilmatesPageSelectUserRequest } from 'actions/vilmates-page'
import { PageHeader } from 'components/common/PageHeader'
import { Container } from 'components/ui/container'
import SpinnerStyled from 'components/ui/spinner'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { ReactComponent as Back } from 'images/vilmates/backArrow.svg'
import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { getSelectedUser, isSelectedUserLoading } from 'selectors/vilmates-page'
import { CommentsSection } from './components/CommentsSection'
import useFetchUserDataById from './components/helpers/useFetchUserData'
import { PersonalInformationSection } from './components/PersonalInformationSection'
import { PhotoSection } from './components/PhotoSection'
import { ProjectsSection } from './components/ProjectsSection'
import styles from './VilmatesSinglePage.module.scss'

export const VilmateSinglePage = () => {
  const { userId: selectedUserId } = useParams()

  const user = useFetchUserDataById(
    vilmatesPageSelectUserRequest,
    getSelectedUser
  )
  const isUserLoading = useEqualSelector(isSelectedUserLoading)

  const isLoading = isUserLoading || user.id !== selectedUserId

  const isUserFound = user ? (
    <Box style={{ display: 'flex' }}>
      <Box className={styles.left_container}>
        <PhotoSection name={user.name} role={user.position} />
        <ProjectsSection selectedUserId={selectedUserId} />
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
