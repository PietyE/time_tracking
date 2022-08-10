import React from 'react'
import { Card } from '@material-ui/core'
import { CardHeader } from './components/CardHeader'
import { CardContent } from './components/CardContent'
import './UserItem.scss'

export const UserItem = ({ user }) => {
  const { name, email, id, position } = user
  return (
    <Card className="user-vilmate-card">
      <CardHeader name={name} />
      <CardContent name={name} position={position} email={email} />
    </Card>
  )
}
