import React, { useState } from 'react'
import CSSTransition from 'react-transition-group'

import { Button, Alert } from 'react-bootstrap'

import './style.scss'

const Blog = () => {
  const [showOpen, setShowOpen] = useState(false)

  const [className, setClassName] = useState('')

  const handlerClickOpenButton = () => {
    if (showOpen) {
      setClassName('end')
      return
    }
    setShowOpen(true)
  }

  return (
    <div>
      <h2>Blog</h2>
      <Button onClick={handlerClickOpenButton}>Press Me to Message</Button>
      {showOpen && (
        <div
          onAnimationStart={() => {
            console.log('onAnimationStart')
          }}
          onAnimationEnd={() => {
            if (className) {
              setClassName('')
              setShowOpen(false)
            }
          }}
          className={`shlapa ${className}`}
        >
          <Alert variant="primary" dismissible onClose={handlerClickOpenButton}>
            <Alert.Heading>Animated alert message</Alert.Heading>
            <p>
              This alert message is being transitioned in and out of the DOM.
            </p>
            <Button onClick={handlerClickOpenButton}>Close</Button>
          </Alert>
        </div>
      )}
    </div>
  )
}

export default Blog
