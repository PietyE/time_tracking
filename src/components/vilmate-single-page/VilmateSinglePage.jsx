import { Box, Typography } from '@material-ui/core'
import {
  vilmatesPageGetDeveloperProjectsListRequest,
  vilmatesPageSelectUserRequest,
} from 'actions/vilmates-page'
import { PageHeader } from 'components/common/PageHeader'
import { Container } from 'components/ui/container'
import SpinnerStyled from 'components/ui/spinner'
import { ADMIN, HR } from 'constants/role-constant'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { ReactComponent as Back } from 'images/vilmates/backArrow.svg'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { getRoleUser } from 'selectors/user'
import {
  getSelectedUser,
  getSelectedUserDeveloperProjects,
  isSelectedUserLoading,
} from 'selectors/vilmates-page'
import { CommentsSection } from './components/CommentsSection'
import useFetchUserDataById from './components/helpers/useFetchUserData'
import { PersonalInformationSection } from './components/PersonalInformationSection'
import { PhotoSection } from './components/PhotoSection'
import { ProjectsSection } from './components/ProjectsSection'
import styles from './VilmatesSinglePage.module.scss'

export const VilmateSinglePage = () => {
  const { userId: selectedUserId } = useParams()
  const dispatch = useDispatch()
  const user = useFetchUserDataById(
    vilmatesPageSelectUserRequest,
    getSelectedUser
  )

  const developerProjects = useEqualSelector(getSelectedUserDeveloperProjects)
  const role = useEqualSelector(getRoleUser)
  const isUserLoading = useEqualSelector(isSelectedUserLoading)

  useEffect(() => {
    dispatch(vilmatesPageGetDeveloperProjectsListRequest(selectedUserId))
  }, [selectedUserId])

  const isLoading =
    isUserLoading || user.id !== selectedUserId || !developerProjects
  //permissions.includes(userPemissions.vilmate_comments_view_vilmatecomment)
  const isCommentsVisible = role === HR || role === ADMIN

  const isUserFound = user ? (
    <Box style={{ display: 'flex' }}>
      <Box className={styles.left_container}>
        <PhotoSection name={user.name} role={user.position} />
        <ProjectsSection
          selectedUserId={selectedUserId}
          projects={developerProjects}
        />
      </Box>
      <Box className={styles.right_container}>
        <PersonalInformationSection user={user} />
        {isCommentsVisible && <CommentsSection name={user.name} />}
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
