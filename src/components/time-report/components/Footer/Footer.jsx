import React from 'react'
import styles from './Footer.module.scss'

export const Footer = ({ time }) => {
  return (
    <footer className={styles.footer}>
      Total hours spend this month:
      <span>{time}</span>
    </footer>
  )
}
