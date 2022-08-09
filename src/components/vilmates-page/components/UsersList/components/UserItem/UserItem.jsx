import React from 'react'
import { Card } from '@material-ui/core'
import { CardHeader } from './components/CardHeader'
import { CardContent } from './components/CardContent'
import { useHistory } from 'react-router-dom'
import './UserItem.scss'

export const UserItem = ({ name, position, id }) => {
  const history = useHistory()
  const onUserClick = () => history.push(`/vilmates/user/${id}`)

  return (
    <Card className="user-vilmate-card" onClick={onUserClick}>
      <CardHeader name={name} />
      <CardContent name={name} position={position} />
    </Card>
  )
}
