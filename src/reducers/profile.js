import {
  SET_USER_OAUTH_DATA,
  CLEAN_USER_OAUTH_DATA,
  SET_AUTH_STATUS,
  SET_FETCHING_PROFILE_STATUS,
  SET_AUTH_IN_PROGRESS,
  UNSET_AUTH_IN_PROGRESS, SET_SIDE_MENU,
} from 'constants/actions-constant'
import { SHOW_FULL_SIDE_MENU } from '../constants/side-menu-constant'

const initial_state = {
  isAuth: false,
  isFetchingUsers: false,
  authInProgress: false,
  sideMenuStatus: SHOW_FULL_SIDE_MENU,
}

export const profile = (state = initial_state, action) => {
 // console.log('state', state)
  switch (action.type) {
    case SET_USER_OAUTH_DATA:
      return { ...state, ...action.payload }
    case SET_AUTH_IN_PROGRESS:
      return { ...state, authInProgress: true }
    case UNSET_AUTH_IN_PROGRESS:
      return { ...state, authInProgress: false }
    case CLEAN_USER_OAUTH_DATA:
      return initial_state
    case SET_AUTH_STATUS:
      return { ...state, isAuth: action.payload }
    case SET_FETCHING_PROFILE_STATUS:
      return { ...state, isFetchingUsers: action.payload }
    case SET_SIDE_MENU:
      return { ...state, sideMenuStatus: action.payload }
    default:
      return state
  }
}

export const getAuthInProgressSelector = (state) => state.profile.authInProgress;
export const getCurrentUserSelector = state => {
  if(state?.profile?.role === 4){
    return ({
      id: state.profile.id,
      name: state.profile.name,
      email: state.profile.email,
    })
  }

  return null
}
