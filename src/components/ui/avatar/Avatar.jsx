import React from 'react'
import { Avatar as MUIAvatar } from '@material-ui/core'
import { stringAvatar } from 'utils/avatar'
import PropTypes from 'prop-types'
import './Avatar.scss'

export const Avatar = ({ name, size = 'small' }) => (
  <MUIAvatar className={`custom-avatar ${size}`} {...stringAvatar(name)} />
)

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
}