import React, { useState } from 'react'
import { connect } from 'react-redux'

import userIcon from 'images/user-icon.svg'
import { getUserAvatarUrl } from 'selectors/user'

import './avatar.css'

function ProfileAvatar({ profileFoto, className }) {
  const defaultClassName = `header_profile_avatar ${className}`
  const [isError, setStateError] = useState(false)

  const handlerLoad = () => {
    if (isError) {
      setStateError(false)
    }
  }

  const handleImgError = () => {
    setStateError(true)
  }

  return (
    <img
      src={isError || !profileFoto ? userIcon : profileFoto}
      alt="avatar"
      className={
        isError || !profileFoto ? `${defaultClassName} error` : defaultClassName
      }
      onError={handleImgError}
      onLoad={handlerLoad}
    />
  )
}

const mapStateToProps = state => ({
  profileFoto: getUserAvatarUrl(state),
})

export default connect(mapStateToProps)(ProfileAvatar)
