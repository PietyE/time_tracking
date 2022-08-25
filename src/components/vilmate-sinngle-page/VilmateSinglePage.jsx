import React, { useEffect } from 'react'
import { PageHeader } from 'components/common/PageHeader'
import { Container } from 'components/ui/container'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch } from 'react-redux'
import { vilmatesPageSelectUserRequest } from 'actions/vilmates-page'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { getSelectedUser, isSelectedUserLoading } from 'selectors/vilmates-page'
import { ReactComponent as Back } from 'images/vilmates/backArrow.svg'
import { Link } from 'react-router-dom'
import './VilmatesSunglePage.scss'
import { Box } from '@material-ui/core'

export const VilmateSinglePage = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const user = useEqualSelector(getSelectedUser)
  const isLoading = useEqualSelector(isSelectedUserLoading)

  useEffect(() => {
    dispatch(vilmatesPageSelectUserRequest(userId))
  }, [userId])

  return (
    <Container>
      <PageHeader name="Vilmates" />
      <Box className="vilmates-single-page-go-back">
        <Back /> <Link to="/vilmates">Back to people list</Link>
      </Box>
    </Container>
  )
}
