import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { ReactComponent as ReadMore } from 'images/vilmates/backArrow.svg'
import styles from './AboutInformation.module.scss'

const ReadMoreMemoized = React.memo(ReadMore)

export const AboutInformation = () => (
  <Box className={styles.about}>
    <Typography variant="h5">About</Typography>
    <Typography variant="body2" component="p">
      Познакомьтесь с Димой, Python Developer из харьковской Project team. Мы
      точно знаем, что Дима умеет отвечать на вопросы развёрнуто — из его анкеты
      можно узнать про мечту знать и животные языки, кардинальный разворот жизни
      всего за 1 год и восхищение женской красотой:)
    </Typography>
    <Button
      endIcon={<ReadMoreMemoized style={{ transform: 'rotate(180deg)' }} />}
    >
      Read more
    </Button>
  </Box>
)
