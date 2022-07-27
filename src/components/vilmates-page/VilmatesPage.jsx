import React from 'react'
import { Container } from 'components/ui/container'
import { PageHeader } from './components/PageHeader'
import { UsersList } from './components/UsersList'

export const VilmatesPage = () => (
  <Container>
    <PageHeader />
    <UsersList />
  </Container>
)
