import React from 'react'
import { ReactComponent as Email } from 'images/personalInfo/Email.svg'
import { ReactComponent as Phone } from 'images/personalInfo/Phone.svg'
import { ReactComponent as Geo } from 'images/personalInfo/Geo.svg'
import { ReactComponent as Slack } from 'images/personalInfo/Slack.svg'
import { ReactComponent as ReportTo } from 'images/personalInfo/ReportTo.svg'
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
    icon: <Geo />,
    title: 'Location',
    text: 'Your location',
  },
  {
    icon: <Slack />,
    title: 'Slack',
    text: '@YourUserName',
  },
  {
    icon: <ReportTo />,
    title: 'Report To',
    text: 'Your PM',
  },
  {
    icon: <Calendar />,
    title: 'Date of birth',
    text: '01.01.2001',
  },
]

export const updateInformation = (currentUser, personalInformation) =>
  personalInformation.reduce(
    (information, nextInformationSource) => [
      ...information,
      {
        ...nextInformationSource,
        text:
          currentUser[nextInformationSource.title.toLowerCase()] ||
          nextInformationSource.text,
      },
    ],
    []
  )
