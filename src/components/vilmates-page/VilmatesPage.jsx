import React from 'react'
import { Container } from 'components/ui/container'
import { PageHeader } from './components/PageHeader'
import { UsersList } from './components/UsersList'
import { Statistics } from './components/Statistics'

export const VilmatesPage = () => (
  <Container>
    <PageHeader />
    <Statistics />
    <UsersList />
  </Container>
)
