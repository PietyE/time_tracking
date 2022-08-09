import React, { useEffect } from 'react'
import { PageHeader } from '../vilmates-page/components/PageHeader'
import { Container } from 'components/ui/container'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch } from 'react-redux'
import { vilmatesPageSelectUserRequest } from 'actions/vilmates-page'

export const VilmateSinglePage = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(vilmatesPageSelectUserRequest(userId))
  }, [userId])

  return (
    <Container>
      <PageHeader name="Vilmates" />
    </Container>
  )
}
