// See full documentation on https://dev-api-timetracking.vilmate.com/docs/api/

export enum DeveloperProjectsEndpoints {
  DEVELOPER_PROJECTS = '/developer-projects/',
  CREATE_LIST = 'create-list/',
  REPORT = 'report/',
  EXPORT_CSV = '/export-csv/',
  EXPORT_EXCEL = '/export-excel/',
}

export enum ProjectsEndpoints {
  PROJECTS = '/projects/',
  TOTAL_MINUTES = 'total_minutes/',
  EXPORT_EXCEL = '/export-excel/',
}

export enum UserHoursEndpoints {
  USER_HOURS = '/user-hours/',
  CREATE_TOKEN = 'create_token/',
  GET_AUTH_URL = 'get_auth_url/',
  SYNC_WITH_GOOGLE_SHEETS = 'sync_with_google_sheets/',
}

export enum UsersEndpoints {
  USERS = '/users/',
  LOGOUT = 'auth/logout/',
  GET_GOOGLE_AUTH_REDIRECT_URL = 'auth/social/google/get-auth/',
  CREATE_GOOGLE_AUTH_TOKEN = 'auth/social/google/callback/',
  LOGIN_WITH_GOOGLE_AUTH = 'auth/social/google/authorize/',
  CONSOLIDATE_REPORT = 'consolidated-report/',
  LOGIN = 'login/',
  PROJECTS_REPORT = '/projects-report/',
  TOGGLE_PROCESSED_STATUS = '/toggle-processed-status/',
}

// can be renamed in People in future
export enum VilmateCommentsEndpoints {
  VILMATE_COMMENTS = '/vilmate-comments/',
}

export enum WorkItemEndpoints {
  WORK_ITEMS = '/work_items/',
  WORK_ITEMS_HISTORY = '/work-items-history/',
}
