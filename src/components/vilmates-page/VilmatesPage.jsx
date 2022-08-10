import React from 'react'
import { Container } from 'components/ui/container'
import { PageHeader } from 'components/common/PageHeader'
import { UsersList } from './components/UsersList'

export const VilmatesPage = () => (
  <Container>
    <PageHeader name="Vilmates" />
    <UsersList />
  </Container>
)
