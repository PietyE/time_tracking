import React from 'react'
import { Container } from 'components/ui/container'
import { PageHeader } from 'components/common/PageHeader'
import { UsersList } from './components/UsersList'
import { Statistics } from './components/Statistics'

export const VilmatesPage = () => (
  <Container>
    <PageHeader name="vilmates" />
    <Statistics />
    <UsersList />
  </Container>
)
