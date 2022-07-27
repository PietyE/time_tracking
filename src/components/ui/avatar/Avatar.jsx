import React from 'react'
import { Avatar as MUIAvatar } from '@material-ui/core'
import { stringAvatar } from 'utils/avatar'
import './Avatar.scss'

export const Avatar = ({ name }) => (
  <MUIAvatar {...stringAvatar(name)} className="custom-avatar" />
)
