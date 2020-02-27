import { SET_DEVELOPERS } from 'constants/actions-constant'

const initialState = {
  items: [],
  count_pages: 1,
  page_size: 10,
  page: 1,
  count_results: 1,
}

export const developers = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVELOPERS:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
