import React from 'react'
import { ReactComponent as Email } from 'images/personalInfo/Email.svg'
import { ReactComponent as Phone } from 'images/personalInfo/Phone.svg'
import { ReactComponent as Slack } from 'images/personalInfo/Slack.svg'
import { ReactComponent as Calendar } from 'images/personalInfo/calendar.svg'

export const personalInformation = [
  {
    icon: <Email />,
    title: 'Email',
    text: 'youremail@vilmate.com',
  },
  {
    icon: <Phone />,
    title: 'Phone',
    text: '+380998768888',
  },
  {
    icon: <Slack />,
    title: 'Slack',
    text: '@YourUserName',
  },
  {
    icon: <Calendar />,
    title: 'Date of birth',
    text: '01.01.2001',
  },
]

export const updateInformation = (currentUser, personalInformation) =>
  personalInformation.reduce((information, nextInformationSource) => {
    const fieldName = nextInformationSource.title
      .toLowerCase()
      .split(' ')
      .join('_')
    return [
      ...information,
      {
        ...nextInformationSource,
        text: currentUser[fieldName] || nextInformationSource.text,
      },
    ]
  }, [])
