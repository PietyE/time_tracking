import {
  SET_CURRENT_ITEMS,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
} from 'constants/actions-constant'

const initialState = {
  pageSize: 20,
  totalItems: [],
  totalItemsCount: 0,
  currentPage: 1,
  currentItems: [],
}

export const pagination = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEMS:
      return {
        ...state,
        currentItems: action.payload,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
      }
    default:
      return state
  }
}
