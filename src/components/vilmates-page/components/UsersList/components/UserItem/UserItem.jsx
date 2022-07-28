import React from 'react'
import { CardHeader } from './components/CardHeader'
import { CardContent } from './components/CardContent'
import { CardFooter } from './components/CardFooter'
import { Card } from '@material-ui/core'
import './UserItem.scss'

export const UserItem = ({ name, position }) => (
  <Card className="user-vilmate-card">
    <CardHeader name={name} />
    <CardContent name={name} position={position} />
    <CardFooter />
  </Card>
)
