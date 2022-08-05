import React from 'react'
import { ReactComponent as LogoSVG } from 'images/logo-image.svg'
import PropTypes from 'prop-types'
import styles from './Logo.module.scss'

const SMALL = 'small'
const LARGE = 'large'

export const Logo = ({ size, classes }) => {
  const sizeClassName = size === SMALL ? styles.small : styles.large

  return (
    <div className={`${classes?.root} ${sizeClassName}`}>
      <LogoSVG />
    </div>
  )
}

Logo.defaultProps = {
  size: SMALL,
}

Logo.propTypes = {
  size: PropTypes.oneOf([SMALL, LARGE]),
  classes: PropTypes.shape({ root: PropTypes.object }),
}
