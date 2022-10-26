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
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { getRoleUser, getUserPermissions } from 'selectors/user'
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
import { userPermissions } from 'constants/permissions'
import { usePersonalInformation } from './components/helpers/usePersonalInformation'
import styles from './VilmatesSinglePage.module.scss'

export const VilmateSinglePage = () => {
  const { userId: selectedUserId } = useParams()
  const dispatch = useDispatch()
  //todo: fix refactoring kostyl
  const [isUserUpdated, setIsUserUpdated] = useState(false)
  const user = useFetchUserDataById(
    vilmatesPageSelectUserRequest,
    getSelectedUser,
    isUserUpdated
  )
  const developerProjects = useEqualSelector(getSelectedUserDeveloperProjects)
  const role = useEqualSelector(getRoleUser)
  const permissions = useEqualSelector(getUserPermissions)
  const isUserLoading = useEqualSelector(isSelectedUserLoading)

  const {
    fields,
    editingState,
    actualPersonalInformation,
    setIsEditingState,
    updateUserPersonalInformation,
    errorsState,
    setErrorsState,
  } = usePersonalInformation(user, isUserUpdated, setIsUserUpdated)

  useEffect(() => {
    dispatch(vilmatesPageGetDeveloperProjectsListRequest(selectedUserId))
  }, [selectedUserId])

  const isLoading =
    isUserLoading || user.id !== selectedUserId || !developerProjects

  const isCommentsVisible =
    role === HR ||
    role === ADMIN ||
    permissions?.includes(userPermissions.vilmate_comments_view_vilmatecomment)

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
        <PersonalInformationSection
          fields={fields}
          actualPersonalInformation={actualPersonalInformation}
          editingState={editingState}
          setIsEditingState={setIsEditingState}
          updateUserPersonalInformation={updateUserPersonalInformation}
          errorsState={errorsState}
          setErrorState={setErrorsState}
        />
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
            <Link to="/vilmates">
              <Back /> Back to people list
            </Link>
          </Box>
          {isUserFound}
        </>
      )}
    </Container>
  )
}
