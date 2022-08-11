import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { PageHeader } from 'components/common/PageHeader'
import { Container } from 'components/ui/container'
import { vilmatesPageSelectUserRequest } from 'actions/vilmates-page'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { getSelectedUser, isSelectedUserLoading } from 'selectors/vilmates-page'
import { ReactComponent as Back } from 'images/vilmates/backArrow.svg'
import SpinnerStyled from 'components/ui/spinner'
import './VilmatesSunglePage.scss'
import { PersonalInformationSection } from './components/PersonalInformationSection'

export const VilmateSinglePage = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const user = useEqualSelector(getSelectedUser)
  const isLoading = useEqualSelector(isSelectedUserLoading)

  useEffect(() => {
    dispatch(vilmatesPageSelectUserRequest(userId))
  }, [userId])

  if (isLoading) return <SpinnerStyled />

  return user ? (
    <Container>
      <PageHeader name="Vilmates" />
      <Box className="vilmates-single-page-go-back">
        <Back /> <Link to="/vilmates">Back to people list</Link>
      </Box>
      <PersonalInformationSection />
    </Container>
  ) : (
    <Typography variant="h6" style={{ padding: '20%' }}>
      No found user by this id
    </Typography>
  )
}
