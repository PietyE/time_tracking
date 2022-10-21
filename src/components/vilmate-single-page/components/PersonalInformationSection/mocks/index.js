import React from 'react'
import { ReactComponent as Email } from 'images/personalInfo/Email.svg'
import { ReactComponent as Phone } from 'images/personalInfo/Phone.svg'
import { ReactComponent as Slack } from 'images/personalInfo/Slack.svg'
import { ReactComponent as Calendar } from 'images/personalInfo/calendar.svg'

const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const phoneRegEp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const slackRegEx = /^@.*/

const dateRegEx = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/

export const personalInformation = [
  {
    icon: <Email />,
    title: 'Email',
    text: 'youremail@vilmate.com',
    validationRule: emailRegEx,
  },
  {
    icon: <Phone />,
    title: 'Phone',
    text: '+380998768888',
    validationRule: phoneRegEp,
  },
  {
    icon: <Slack />,
    title: 'Slack',
    text: '@YourUserName',
    validationRule: slackRegEx,
  },
  {
    icon: <Calendar />,
    title: 'Date of birth',
    text: '01.01.2001',
    validationRule: dateRegEx,
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

export const createValidationSchema = (userInformation) =>
  userInformation?.reduce(
    (fields, nextField) => ({
      ...fields,
      [toCorrectFormCase(nextField.title)]: userInformation?.validationSchema,
    }),
    {}
  )
