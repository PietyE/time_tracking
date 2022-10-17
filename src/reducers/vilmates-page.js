import {
  VILMATE_PAGE_ADD_DEVELOPER_PROJECT_SUCCESS,
  VILMATE_PAGE_CHANGE_USER_ON_PROJECT_SUCCESS,
  VILMATES_PAGE_DELETE_COMMENT_ERROR,
  VILMATES_PAGE_DELETE_COMMENT_REQUEST,
  VILMATES_PAGE_DELETE_COMMENT_SUCCESS,
  VILMATES_PAGE_GET_COMMENTS_ERROR,
  VILMATES_PAGE_GET_COMMENTS_REQUEST,
  VILMATES_PAGE_GET_COMMENTS_SUCCESS,
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_SUCCESS,
  VILMATES_PAGE_GET_USERS_LIST_ERROR,
  VILMATES_PAGE_GET_USERS_LIST_SUCCESS,
  VILMATES_PAGE_POST_COMMENT_ERROR,
  VILMATES_PAGE_POST_COMMENT_REQUEST,
  VILMATES_PAGE_POST_COMMENT_SUCCESS,
  VILMATES_PAGE_SELECT_USER_ERROR,
  VILMATES_PAGE_SELECT_USER_SUCCESS,
} from 'constants/vilmates-page'

const initialState = {
  isLoading: true,
  users: [],
  error: '',
  singlePage: {
    isLoading: true,
    selectedUser: '',
    comments: {
      data: [],
      isLoading: true,
    },
  },
}

export const vilmatesPage = (state = initialState, action) => {
  switch (action.type) {
    case VILMATES_PAGE_GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      }
    case VILMATES_PAGE_GET_USERS_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case VILMATES_PAGE_SELECT_USER_SUCCESS:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          isLoading: false,
          selectedUser: action.payload,
        },
      }
    case VILMATES_PAGE_SELECT_USER_ERROR:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          isLoading: false,
        },
      }
    case VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_SUCCESS:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          developerProjects: action.payload,
        },
      }
    case VILMATE_PAGE_CHANGE_USER_ON_PROJECT_SUCCESS:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          developerProjects: state.singlePage.developerProjects.map(
            (developerProject) =>
              developerProject.id === action.payload.developerProjectId
                ? {
                    ...developerProject,
                    ...action.payload.changedDeveloperProjectData,
                  }
                : developerProject
          ),
        },
      }
    case VILMATE_PAGE_ADD_DEVELOPER_PROJECT_SUCCESS:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          developerProjects: [
            ...state.singlePage.developerProjects,
            { ...action.payload, is_active: true },
          ],
        },
      }
    case VILMATES_PAGE_GET_COMMENTS_REQUEST:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: true,
          },
        },
      }
    case VILMATES_PAGE_GET_COMMENTS_SUCCESS:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: false,
            data: action.payload,
          },
        },
      }
    case VILMATES_PAGE_GET_COMMENTS_ERROR:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: false,
          },
        },
      }
    case VILMATES_PAGE_POST_COMMENT_REQUEST:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: true,
          },
        },
      }
    case VILMATES_PAGE_POST_COMMENT_SUCCESS:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: false,
            data: [...state.singlePage.comments.data, action.payload],
          },
        },
      }
    case VILMATES_PAGE_POST_COMMENT_ERROR:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: false,
          },
          developerProjects: [
            ...state.singlePage.developerProjects,
            { ...action.payload, is_active: true },
          ],
        },
      }
    case VILMATES_PAGE_DELETE_COMMENT_REQUEST:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: true,
          },
        },
      }
    case VILMATES_PAGE_DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: false,
            data: state.singlePage.comments.data.filter(
              (comment) => comment.id !== action.payload
            ),
          },
        },
      }
    case VILMATES_PAGE_DELETE_COMMENT_ERROR:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          comments: {
            ...state.singlePage.comments,
            isLoading: false,
          },
        },
      }
    default:
      return state
  }
}
