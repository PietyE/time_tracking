/**User Action Constant */
export const SET_USER_OAUTH_DATA = 'SET_USER_OAUTH_DATA'
export const CLEAN_USER_OAUTH_DATA = 'CLEAN_USER_OAUTH_DATA'
export const SET_AUTH_IN_PROGRESS = '@@profile/SET_AUTH_IN_PROGRESS'
export const UNSET_AUTH_IN_PROGRESS = '@@profile/UNSET_AUTH_IN_PROGRESS'
export const LOG_IN = 'LOG_IN'
export const LOG_IN_WITH_CREDENTIALS = '@@profile/LOG_IN_WITH_CREDENTIALS'
export const LOG_OUT = 'LOG_OUT'
export const BOOTSTRAP = 'BOOTSTRAP'
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS'
export const SET_FETCHING_PROFILE_STATUS = 'SET_FETCHING_PROFILE_STATUS'
export const SET_NEW_RATE = 'SET_NEW_RATE'
export const SET_NEW_SALARY = 'SET_NEW_SALARY'
export const SET_NEW_COST = 'SET_NEW_COST'
export const SET_EDITED_COST = 'SET_EDITED_COST'
export const SET_NEW_COMMENT = 'SET_NEW_COMMENT'
export const SET_EDITED_COMMENT = 'SET_EDITED_COMMENT'
export const SET_PROCESSED_STATUS = 'SET_PROCESSED_STATUS'
/** Alert Action Constant*/
export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'
export const START_SHOW_ALERT = 'START_SHOW_ALERT'
export const SET_MESSAGE = 'SET_MESSAGE'

/** Error Action */
export const SET_ERROR_DATA = 'SET_ERROR_DATA'
export const CLEAN_ERROR_DATA = 'CLEAN_ERROR_DATA'

/** Timereports Action */
export const CHANGE_SELECTED_DATE_TIME_REPORT =
  'CHANGE_SELECTED_DATE_TIME_REPORT'
export const SET_TIME_REPORTS = 'SET_TIME_REPORTS'
export const SET_DEVELOPER_PROJECTS_TR = 'SET_DEVELOPER_PROJECTS_TR'
export const ADD_TIME_REPORT = 'ADD_TIME_REPORT'
export const EDIT_TIME_REPORT = 'EDIT_TIME_REPORT'
export const DELETE_TIME_REPORT = 'DELETE_TIME_REPORT'
export const SELECT_PROJECT = 'SELECT_PROJECT'
export const SET_IS_FETCHING_REPORTS = 'SET_IS_FETCHING_REPORTS'
export const SET_IS_FETCHING_PROJECT_REPORTS = 'SET_IS_FETCHING_PROJECT_REPORTS'
export const CLEAR_SELECTED_PROJECT = 'CLEAR_SELECTED_PROJECT'
export const RESET_SELECTED_DATE = 'RESET_SELECTED_DATE'
export const SET_EDIT_MODE = 'SET_EDIT_MODE'
export const GET_TIME_REPORT_CSV = 'GET_TIME_REPORT_CSV'

/** Projects reports Action */
export const CHANGE_SELECTED_DATE_PROJECTS_REPORT =
  'CHANGE_SELECTED_DATE_PROJECTS_REPORT'
export const GET_DEV_CONSOLIDATE_PROJECT_REPORT =
  'GET_DEV_CONSOLIDATE_PROJECT_REPORT'
export const SET_DEV_CONSOLIDATE_PROJECT_REPORT =
  'SET_DEV_CONSOLIDATE_PROJECT_REPORT'
export const SET_SELECTED_DEVELOPER = 'SET_SELECTED_DEVELOPER'
export const CLEAR_SELECTED_DEVELOPER = 'CLEAR_SELECTED_DEVELOPER'
export const SET_SELECTED_PROJECT_PROJECTREPORTS =
  'SET_SELECTED_PROJECT_PROJECTREPORTS'
export const CLEAR_SELECTED_PROJECT_PROJECTREPORTS =
  'CLEAR_SELECTED_PROJECT_PROJECTREPORTS'
export const SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT =
  'SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT'
export const GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT =
  'GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT'
export const SET_ALL_DEVELOPER_PROJECTS = 'SET_ALL_DEVELOPER_PROJECTS'
export const GET_ALL_DEVELOPER_PROJECTS = 'GET_ALL_DEVELOPER_PROJECTS'
export const SET_EDIT_USER_ID = 'SET_EDIT_USER_ID'
export const SET_EXCHANGE_RATES = 'SET_EXCHANGE_RATES'
export const GET_CONSOLIDATE_PROJECT_REPORT =
  '@@projectreport/GET_CONSOLIDATE_PROJECT_REPORT'
export const SET_CONSOLIDATE_PROJECT_REPORT =
  '@@projectreport/SET_CONSOLIDATE_PROJECT_REPORT'
export const GET_USERS_PROJECT_REPORT =
  '@@projectreport/GET_USERS_PROJECT_REPORT'
export const SET_SUCCESS_USERS_PROJECT_REPORT =
  '@@projectreport/SET_SUCCESS_USERS_PROJECT_REPORT'
export const SET_ERROR_USER_PROJECT_REPORT =
  '@@projectreport/SET_ERROR_USER_PROJECT_REPORT'

/** Developer Projects */
export const SET_DEVELOPER_PROJECTS = 'SET_DEVELOPER_PROJECTS'
export const GET_DEVELOPER_PROJECTS = 'GET_DEVELOPER_PROJECTS'
export const GET_PROJECTS = 'GET_PROJECTS'
export const ADD_DEVELOPER_TO_PROJECT = 'ADD_DEVELOPER_TO_PROJECT'

/** Developer */
export const SET_DEVELOPERS = 'SET_DEVELOPERS'
export const GET_DEVELOPERS = 'GET_DEVELOPERS'
export const SELECT_DEVELOPERS = 'SELECT_DEVELOPERS'

/** Processing to locations */
export const LOCATION_PROCESSING = 'LOCATION_PROCESSING'

/** Currency */
export const GET_CURRENCIES_LIST = '@@currency/GET_CURRENCIES_LIST'
export const SET_SUCCESS_CURRENCIES_LIST =
  '@@currency/SET_SUCCESS_CURRENCIES_LIST'
export const SET_ERROR_CURRENCIES_LIST = '@@currency/SET_ERROR_CURRENCIES_LIST'
export const GET_RATES_LIST = '@@currency/GET_RATES_LIST'
export const SET_SUCCESS_RATES_LIST = '@@currency/SET_SUCCESS_RATES_LIST'
export const SET_ERROR_RATES_LIST = '@@currency/SET_ERROR_RATES_LIST'

//accountant actions
export const GET_USERS_HOURS_AUTH_URL_REQUEST =
  'GET_USERS_HOURS_AUTH_URL_REQUEST'
export const GET_USERS_HOURS_AUTH_URL_SUCCESS =
  'GET_USERS_HOURS_AUTH_URL_SUCCESS'

/** Projects management Action */
export const CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT =
  'CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT'
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS'
export const SET_ALL_PROJECTS = 'SET_ALL_PROJECTS'
export const GET_ACTIVE_PROJECTS = 'GET_ACTIVE_PROJECTS'
export const GET_PROJECT_REPORT_BY_ID = 'GET_PROJECT_REPORT_BY_ID'
export const GET_DEVELOPER_PROJECTS_BY_ID = 'GET_DEVELOPER_PROJECTS_BY_ID'
export const SET_PROJECT_REPORTS = 'SET_PROJECT_REPORTS'
export const GET_DOWNLOAD_PROJECT_REPORT = 'GET_DOWNLOAD_PROJECT_REPORT '
export const CREATE_PROJECT = 'CREATE_PROJECT'
export const CHANGE_PROJECT_NAME = 'CHANGE_PROJECT_NAME'
export const SET_SIDE_MENU = 'SET_SIDE_MENU'
export const SET_SIDE_MENU_ARROW = 'SET_SIDE_MENU_ARROW'

export const SET_SELECTED_PROJECT_ID = 'SET_SELECTED_PROJECT_ID'
export const GET_SELECTED_PROJECT = 'GET_SELECTED_PROJECT'
export const SET_SELECTED_PROJECT = 'SET_SELECTED_PROJECT'
export const CHANGE_USERS_ON_PROJECT = 'CHANGE_USERS_ON_PROJECT'
export const ADD_USERS_ON_PROJECT = 'ADD_USERS_ON_PROJECT'
export const CLEAR_PM_PROJECTS = 'CLEAR_PM_PROJECTS'
export const GET_DOWNLOAD_ALL_TEAM_PROJECT_REPORT =
  'GET_DOWNLOAD_ALL_TEAM_PROJECT_REPORT'
export const SET_IS_FETCHING_PM_PAGE = 'SET_IS_FETCHING_PM_PAGE'
export const SET_SHOW_EDIT_MODAL = 'SET_SHOW_EDIT_MODAL'
export const SET_SHOW_CREATE_MODAL = 'SET_SHOW_CREATE_MODAL'
export const SET_SHOW_CREATE_USER_MODAL = 'SET_SHOW_CREATE_USER_MODAL'
export const SET_SELECTED_PM = 'SET_SELECTED_PM'
export const SET_SHOWN_PROJECT = 'SET_SHOWN_PROJECT'
export const ADD_PROJECT_MANAGER_TO_PROJECT = 'ADD_PROJECT_MANAGER_TO_PROJECT'
export const ADD_INACTIVE_PROJECT_MANAGER_TO_PROJECT =
  'ADD_INACTIVE_PROJECT_MANAGER_TO_PROJECT'
export const USER_ADDED_SUCCESSFULLY = 'USER_ADDED_SUCCESSFULLY'
export const USER_ADDED_FAILED = 'USER_ADDED_FAILED'

export const SET_STATUS_USER = 'SET_STATUS_USER'

/**pagination*/

export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_CURRENT_ITEMS = 'SET_CURRENT_ITEMS'
export const SET_TOTAL_ITEMS_COUNT = 'SET_TOTAL_ITEMS_COUNT'

export const CLEAR_PM_PAGE = 'CLEAR_PM_PAGE'
