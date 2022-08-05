import React from 'react'
import { Card } from '@material-ui/core'
import { CardHeader } from './components/CardHeader'
import { CardContent } from './components/CardContent'
import './UserItem.scss'

export const UserItem = ({ name, position }) => (
  <Card className="user-vilmate-card">
    <CardHeader name={name} />
    <CardContent name={name} position={position} />
  </Card>
)
