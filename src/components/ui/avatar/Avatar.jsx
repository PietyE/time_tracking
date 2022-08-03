import React from 'react'
import { Avatar as MUIAvatar } from '@material-ui/core'
import { stringAvatar } from 'utils/avatar'
import './Avatar.scss'

export const Avatar = ({ name, size = 'small' }) => (
  <MUIAvatar className={`custom-avatar ${size}`} {...stringAvatar(name)} />
)
