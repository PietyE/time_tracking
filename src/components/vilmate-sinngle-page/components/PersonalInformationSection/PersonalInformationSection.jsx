import React from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Typography,
  Button,
} from '@material-ui/core'

import { ReactComponent as Email } from 'images/personalInfo/Email.svg'
import { ReactComponent as Geo } from 'images/personalInfo/Geo.svg'
import { ReactComponent as Slack } from 'images/personalInfo/Slack.svg'
import { ReactComponent as ReportTo } from 'images/personalInfo/ReportTo.svg'
import { ReactComponent as Phone } from 'images/personalInfo/Phone.svg'
import { ReactComponent as Calendar } from 'images/personalInfo/calendar.svg'
import { ReactComponent as ReadMore } from 'images/vilmates/backArrow.svg'
import styles from './PersonalInformationSection.module.scss'

const ReadMoreMemoized = React.memo(ReadMore)

const personalInformationInfo = [
  {
    icon: <Email />,
    title: 'Email',
    text: 'larov.dmytro@vilmate.com',
  },
  {
    icon: <Phone />,
    title: 'Phone',
    text: '+380999999999',
  },
  {
    icon: <Geo />,
    title: 'Location',
    text: 'Kharkiv',
  },
  {
    icon: <Slack />,
    title: 'Slack',
    text: '@LavrovDmytro',
  },
  {
    icon: <ReportTo />,
    title: 'Report To',
    text: 'Anna Polishchuk',
  },
  {
    icon: <Calendar />,
    title: 'Date of birth',
    text: '05.11.1996',
  },
]

export const PersonalInformationSection = () => {
  const renderListItems = () =>
    personalInformationInfo.map((item) => (
      <ListItem key={item.text} className={styles.list_item}>
        <ListItemAvatar className={styles.avatar}>{item.icon}</ListItemAvatar>
        <ListItemText primary={item.title} secondary={item.text} />
      </ListItem>
    ))
  return (
    <RightSessionContainer title="Personal information">
      <Box className={styles.information}>
        <List className={styles.list}>{renderListItems()}</List>
        <Divider />
      </Box>
      <Box className={styles.about}>
        <Typography variant="h5">About</Typography>
        <Typography variant="body2" component="p">
          Познакомьтесь с Димой, Python Developer из харьковской Project team.
          Мы точно знаем, что Дима умеет отвечать на вопросы развёрнуто — из его
          анкеты можно узнать про мечту знать и животные языки, кардинальный
          разворот жизни всего за 1 год и восхищение женской красотой:)
        </Typography>
        <Button
          endIcon={<ReadMoreMemoized style={{ transform: 'rotate(180deg)' }} />}
        >
          Read more
        </Button>
      </Box>
    </RightSessionContainer>
  )
}
