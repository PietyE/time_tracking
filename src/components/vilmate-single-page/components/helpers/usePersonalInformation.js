import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  createInputEditingMode,
  createInputField,
  personalInformation,
  updateInformation,
} from '../PersonalInformationSection/mocks'
import { vilatesSinglePageUpdateUserInformationRequest } from 'actions/vilmates-page'

export const usePersonalInformation = (
  user,
  isUserUpdated,
  setIsUserUpdated
) => {
  const dispatch = useDispatch()
  const actualPersonalInformation = updateInformation(user, personalInformation)
  const fields = createInputField(actualPersonalInformation)
  const [editingState, setIsEditingState] = useState(
    createInputEditingMode(actualPersonalInformation)
  )

  const updateUserPersonalInformation = (userInfo) => {
    dispatch(
      vilatesSinglePageUpdateUserInformationRequest({
        id: user.id,
        ...userInfo,
      })
    )
    setIsUserUpdated(!isUserUpdated)
  }

  return {
    fields,
    editingState,
    actualPersonalInformation,
    setIsEditingState,
    updateUserPersonalInformation,
  }
}
