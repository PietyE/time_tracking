import React from 'react'
import { Box, Divider, Typography } from '@material-ui/core'
import styles from './RightSessionContainer.module.scss'

export const RightSessionContainer = ({
  children,
  title,
  isHaveScroll = false,
}) => {
  const shouldBeScrolled = isHaveScroll && styles.scroll
  return (
    <Box className={styles.container} component="section">
      <Typography className={styles.title} variant="h6">
        {title}
      </Typography>
      <Divider variant="fullWidth" className={styles.divider} />
      <Box className={`${styles.content_container} ${shouldBeScrolled}`}>
        {children}
      </Box>
    </Box>
  )
}
