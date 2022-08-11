import React from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core'

import { ReactComponent as Email } from 'images/personalInfo/Email.svg'
import { ReactComponent as Geo } from 'images/personalInfo/Geo.svg'
import { ReactComponent as Slack } from 'images/personalInfo/Slack.svg'
import { ReactComponent as ReportTo } from 'images/personalInfo/ReportTo.svg'
import { ReactComponent as Phone } from 'images/personalInfo/Phone.svg'
import { ReactComponent as Calendar } from 'images/personalInfo/calendar.svg'
import styles from './PersonalInformationSection.module.scss'

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
      <Box className="information">
        <Box component="information_left">
          <List className={styles.list}>{renderListItems()}</List>
        </Box>
        <Box className="information_right"></Box>
      </Box>
    </RightSessionContainer>
  )
}
