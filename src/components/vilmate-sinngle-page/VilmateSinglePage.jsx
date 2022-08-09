import React, { useEffect } from 'react'
import { PageHeader } from '../vilmates-page/components/PageHeader'
import { Container } from '../ui/container'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch } from 'react-redux'

export const VilmateSinglePage = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()

  return (
    <Container>
      <PageHeader name="Vilmates" />
    </Container>
  )
}
