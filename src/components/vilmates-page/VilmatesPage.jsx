import React from 'react'
import { PageHeader } from 'components/common/PageHeader'
import { UsersList } from './components/UsersList'
import { Container } from 'components/ui/container'

export const VilmatesPage = () => (
  <Container>
    <PageHeader name="Vilmates" />
    <UsersList />
  </Container>
)
