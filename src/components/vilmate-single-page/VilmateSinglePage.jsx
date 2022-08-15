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
import './VilmatesSinglePage.scss'
import { PhotoSection } from './components/PhotoSection'

export const VilmateSinglePage = () => {
  const [user, isLoading] = useFetchUserById(
    vilmatesPageSelectUserRequest,
    getSelectedUser,
    isSelectedUserLoading
  )

  const isUserFound = user ? (
    <PersonalInformationSection user={user} />
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
          <Box className="vilmates-single-page-go-back">
            <Back /> <Link to="/vilmates">Back to people list</Link>
          </Box>
          <Box style={{ display: 'flex' }}>
            <PhotoSection name={user.name} role={user.position} />
            {isUserFound}
          </Box>
        </>
      )}
    </Container>
  )
}
