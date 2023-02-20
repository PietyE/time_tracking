import React, { useState } from 'react';
import get from 'lodash/get';
import Calendar from '@mui/icons-material/CalendarMonth';
import format from 'date-fns/format';
import { Slack } from 'shared/components/svg/personalInformation/Slack';
import { Email } from 'shared/components/svg/personalInformation/Email';
import { Phone } from 'shared/components/svg/personalInformation/Phone';
import { useAppDispatch } from 'hooks/redux';
import { updateVilmateUser } from 'redux/asyncActions/vilmateSinglePage';
import type { User, CreateUserData } from 'api/models/users';

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// const phoneRegExp =
//   /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;

const slackValidationRegExp = /^[@]{1}/;

const dateValidationRegExp = /^\d{4}-\d{2}-\d{2}$/;

const defaultDate = new Date();

const required = /^[a-z\s]{0,255}$/i;

export interface UserField {
  icon: React.ReactElement;
  title: string;
  text: string;
  validationRule: RegExp;
  message: string;
  type: string;
}
export const personalInformation: UserField[] = [
  {
    icon: <Email />,
    title: 'Email',
    text: 'youremail@vilmate.com',
    validationRule: emailRegExp,
    message: 'Format should be youremail@vilmate.com',
    type: 'input',
  },
  {
    icon: <Phone />,
    title: 'Reports to',
    text: 'Report to',
    validationRule: required,
    message: 'Please Select Correct',
    type: 'autocomplete',
  },
  // {
  //   icon: <Phone />,
  //   title: 'Phone',
  //   text: '+380998768888',
  //   validationRule: phoneRegExp,
  //   message: 'Format should be +380991111111 or 991111111',
  // },
  {
    icon: <Slack />,
    title: 'Slack',
    text: '@YourUserName',
    validationRule: slackValidationRegExp,
    message: 'Format should be @YourUserName',
    type: 'input',
  },
  {
    icon: <Calendar />,
    title: 'Date of birth',
    text: format(defaultDate, 'yyyy-MM-dd'),
    validationRule: dateValidationRegExp,
    message: 'Format should be YYYY-MM-dd',
    type: 'calendar',
  },
];

export const toCorrectFormCase = <T extends string>(str: string): T =>
  // @ts-expect-error
  str?.toLowerCase().split(' ').join('_');

export const updateInformation = (
  currentUser: Omit<User, 'permissions'>,
  personalInformation: UserField[],
): UserField[] =>
  personalInformation?.reduce(
    (information: UserField[], nextInformationSource: UserField) => {
      const fieldName = toCorrectFormCase(nextInformationSource.title);
      return [
        ...information,
        {
          ...nextInformationSource,
          text: get(currentUser, fieldName, nextInformationSource.text),
        },
      ];
    },
    [],
  );

export interface InputField {
  slack: string;
  email: string;
  reports_to: string;
  date_of_birth: string;
}

const initial = {} as InputField;
export const createInputField = (userInformation: UserField[]): InputField =>
  userInformation?.reduce(
    (fields: InputField, nextField) => ({
      ...fields,
      [toCorrectFormCase(nextField.title)]: nextField.text,
    }),
    initial,
  );

export type Keys = keyof InputField;
const editInitial = {} as Record<Keys, boolean>;
export const createInputEditingMode = (
  userInformation: UserField[],
): Record<Keys, boolean> =>
  userInformation?.reduce(
    (fields: Record<Keys, boolean>, nextField) => ({
      ...fields,
      [toCorrectFormCase(nextField.title)]: false,
    }),
    editInitial,
  );

interface ReturnType {
  fields: InputField;
  editingState: Record<Keys, boolean>;
  actualPersonalInformation: UserField[];

  setIsEditingState: React.Dispatch<
    React.SetStateAction<Record<keyof InputField, boolean>>
  >;
  updateUserPersonalInformation: (userInfo: Partial<CreateUserData>) => void;
  errorsState: Record<Keys, boolean>;
  setErrorsState: React.Dispatch<
    React.SetStateAction<Record<keyof InputField, boolean>>
  >;
}

export const usePersonalInformation = (
  user: Omit<User, 'permissions'>,
): ReturnType => {
  const dispatch = useAppDispatch();
  const actualPersonalInformation = updateInformation(
    user,
    personalInformation,
  );
  const fields = createInputField(actualPersonalInformation);
  const [editingState, setIsEditingState] = useState(
    createInputEditingMode(actualPersonalInformation),
  );
  const [errorsState, setErrorsState] = useState(
    createInputEditingMode(actualPersonalInformation),
  );

  const updateUserPersonalInformation = (
    userInfo: Partial<CreateUserData>,
  ): void => {
    void dispatch(
      updateVilmateUser({
        id: user.id,
        updatedUser: userInfo,
      }),
    );
  };

  return {
    fields,
    editingState,
    actualPersonalInformation,
    setIsEditingState,
    updateUserPersonalInformation,
    errorsState,
    setErrorsState,
  };
};
