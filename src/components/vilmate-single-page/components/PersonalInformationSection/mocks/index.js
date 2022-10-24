import React from 'react'
import { ReactComponent as Email } from 'images/personalInfo/Email.svg'
import { ReactComponent as Phone } from 'images/personalInfo/Phone.svg'
import { ReactComponent as Slack } from 'images/personalInfo/Slack.svg'
import { ReactComponent as Calendar } from 'images/personalInfo/calendar.svg'

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const phoneRegExp =
  /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im

const slackValidationRegExp = /^[@]{1}/

const dateValidationRegExp = /^\d{4}-\d{2}-\d{2}$/

export const personalInformation = [
  {
    icon: <Email />,
    title: 'Email',
    text: 'youremail@vilmate.com',
    validationRule: emailRegExp,
    message: 'Format should be youremail@vilmate.com',
  },
  {
    icon: <Phone />,
    title: 'Phone',
    text: '+380998768888',
    validationRule: phoneRegExp,
    message: 'Format should be +380991111111 or 991111111',
  },
  {
    icon: <Slack />,
    title: 'Slack',
    text: '@YourUserName',
    validationRule: slackValidationRegExp,
    message: 'Format should be @YourUserName',
  },
  {
    icon: <Calendar />,
    title: 'Date of birth',
    text: '2010-01-01',
    validationRule: dateValidationRegExp,
    message: 'Format should be YYYY-MM-DD',
  },
]

export const toCorrectFormCase = (string) =>
  string?.toLowerCase().split(' ').join('_')

export const updateInformation = (currentUser, personalInformation) =>
  personalInformation?.reduce((information, nextInformationSource) => {
    const fieldName = toCorrectFormCase(nextInformationSource.title)
    return [
      ...information,
      {
        ...nextInformationSource,
        text: currentUser[fieldName] || nextInformationSource.text,
      },
    ]
  }, [])

export const createInputField = (userInformation) =>
  userInformation?.reduce(
    (fields, nextField) => ({
      ...fields,
      [toCorrectFormCase(nextField.title)]: nextField.text,
    }),
    {}
  )

export const createInputEditingMode = (userInformation) =>
  userInformation?.reduce(
    (fields, nextField) => ({
      ...fields,
      [toCorrectFormCase(nextField.title)]: false,
    }),
    {}
  )
