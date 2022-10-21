import React from 'react'
import { ReactComponent as Email } from 'images/personalInfo/Email.svg'
import { ReactComponent as Phone } from 'images/personalInfo/Phone.svg'
import { ReactComponent as Slack } from 'images/personalInfo/Slack.svg'
import { ReactComponent as Calendar } from 'images/personalInfo/calendar.svg'
import * as Yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const personalInformation = [
  {
    icon: <Email />,
    title: 'Email',
    text: 'youremail@vilmate.com',
    validationSchema: Yup.string().email('Invalid email format'),
  },
  {
    icon: <Phone />,
    title: 'Phone',
    text: '+380998768888',
    validationSchema: Yup.string().matches(
      phoneRegExp,
      'Phone number is not valid'
    ),
  },
  {
    icon: <Slack />,
    title: 'Slack',
    text: '@YourUserName',
    validationSchema: Yup.string(),
  },
  {
    icon: <Calendar />,
    title: 'Date of birth',
    text: '01.01.2001',
    validationSchema: Yup.date(),
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
