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
  CREATE_TOKEN = '/user-hours/create_token/',
  GET_AUTH_URL = '/user-hours/get_auth_url/',
  SYNC_WITH_GOOGLE_SHEETS = '/user-hours/sync_with_google_sheets/',
}

export enum UsersEndpoints {
  USERS = '/users/',
  LOGOUT = 'auth/logout/',
  LOGIN_WITH_GOOGLE_AUTH = 'auth/social/google/authorize/',
  CONSOLIDATE_REPORT = 'consolidated-report/',
  LOGIN = 'login/',
  PROJECTS_REPORT = '/projects-report/',
}

// can be renamed in People in future
export enum VilmateCommentsEndpoints {
  VILMATE_COMMENTS = '/vilmate-comments/',
}

export enum WorkItemEndpoints {
  WORK_ITEMS = '/work_items/',
  WORK_ITEMS_HISTORY = '/work-items-history/',
}
