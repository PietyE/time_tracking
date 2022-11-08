//See full documentation https://docs.google.com/document/d/1TZ1Rmy_6GoTwRgrqiiGLjEwSBuO4Yz_6oOmC9YHN9m8/edit
// ( 2.3 User classes and characteristics )

export enum PagesViewPermissions {
    users_can_view_projectmanagement = 'users.can_view_projectmanagement',
    users_can_view_vilmates = 'users.can_view_vilmates',
}

export enum UsersPermissions {
    users_view_salary = 'users.view_salary',
    users_delete_commenthistory = 'users.delete_commenthistory',
    users_delete_user = 'users.delete_user',
    users_add_socialaccount = 'users.add_socialaccount',
    users_view_processeduserflag = 'users.view_processeduserflag',
    users_delete_socialaccount = 'users.delete_socialaccount',
    users_add_commenthistory = 'users.add_commenthistory',
    users_delete_token = 'users.delete_token',
    users_change_expensehistory = 'users.change_expensehistory',
    users_view_user = 'users.view_user',
    users_add_salary = 'users.add_salary',
    users_delete_processeduserflag = 'users.delete_processeduserflag',
    users_change_exchangerate = 'users.change_exchangerate',
    users_delete_salary = 'users.delete_salary',
    users_add_token = 'users.add_token',
    users_change_token = 'users.change_token',
    users_view_commenthistory = 'users.view_commenthistory',
    users_add_exchangerate = 'users.add_exchangerate',
    users_add_expensehistory = 'users.add_expensehistory',
    users_add_user = 'users.add_user',
    users_change_user = 'users.change_user',
    users_change_salary = 'users.change_salary',
    users_view_token = 'users.view_token',
    users_view_exchangerate = 'users.view_exchangerate',
    users_view_socialaccount = 'users.view_socialaccount',
    users_delete_exchangerate = 'users.delete_exchangerate',
    users_add_processeduserflag = 'users.add_processeduserflag',
    users_view_expensehistory = 'users.view_expensehistory',
    users_change_socialaccount = 'users.change_socialaccount',
    users_change_processeduserflag = 'users.change_processeduserflag',
    users_delete_expensehistory = 'users.delete_expensehistory',
    users_change_commenthistory= 'users.change_commenthistory',
}

export enum ProjectsPermissions {
    projects_change_rate = 'projects.change_rate',
    projects_change_workitem = 'projects.change_workitem',
    projects_change_project = 'projects.change_project',
    projects_view_rate = 'projects.view_rate',
    projects_delete_rate = 'projects.delete_rate',
    projects_view_workitem = 'projects.view_workitem',
    projects_add_rate = 'projects.add_rate',
    projects_delete_workitem = 'projects.delete_workitem',
    projects_view_project = 'projects.view_project',
    projects_add_workitem = 'projects.add_workitem',
    projects_delete_project = 'projects.delete_project',
    projects_add_project = 'projects.add_project',
}

export enum DeveloperProjectsPermissions {
    projects_view_developerproject = 'projects.view_developerproject',
    projects_view_developerprojectchangestatus =
        'projects.view_developerprojectchangestatus',
    projects_add_developerproject = 'projects.add_developerproject',
    projects_delete_developerproject = 'projects.delete_developerproject',
    projects_delete_developerprojectchangestatus =
        'projects.delete_developerprojectchangestatus',
    projects_change_developerproject = 'projects.change_developerproject',
    projects_add_developerprojectchangestatus =
        'projects.add_developerprojectchangestatus',
    projects_change_developerprojectchangestatus =
        'projects.change_developerprojectchangestatus',
}

export enum SyncWithGoogleSheetsPermissions {
    gsheets_change_accesscredentials = 'gsheets.change_accesscredentials',
    gsheets_delete_accesscredentials = 'gsheets.delete_accesscredentials',
    gsheets_view_accesscredentials = 'gsheets.view_accesscredentials',
    gsheets_add_accesscredentials = 'gsheets.add_accesscredentials',
    users_can_view_syncdrive = 'users.can_view_syncdrive',
}

export enum VilmatesCommentsPermissions {
    vilmate_comments_delete_vilmatecomment =
        'vilmate_comments.delete_vilmatecomment',
    vilmate_comments_add_vilmatecomment = 'vilmate_comments.add_vilmatecomment',
    vilmate_comments_change_vilmatecomment =
        'vilmate_comments.change_vilmatecomment',
    vilmate_comments_view_vilmatecomment = 'vilmate_comments.view_vilmatecomment',
}

export enum WorkItemsPermissions {
    work_items_change_workitem = 'work_items.change_workitem',
    work_items_change_workitemhistory = 'work_items.change_workitemhistory',
    work_items_delete_comment = 'work_items.delete_comment',
    work_items_add_workitemhistory = 'work_items.add_workitemhistory',
    work_items_delete_workitemhistory = 'work_items.delete_workitemhistory',
    work_items_change_processeduserflag = 'work_items.change_processeduserflag',
    work_items_view_comment = 'work_items.view_comment',
    work_items_delete_processeduserflag = 'work_items.delete_processeduserflag',
    work_items_add_workitem = 'work_items.add_workitem',
    work_items_view_workitemhistory = 'work_items.view_workitemhistory',
    work_items_delete_workitem = 'work_items.delete_workitem',
    work_items_change_comment = 'work_items.change_comment',
    work_items_add_processeduserflag = 'work_items.add_processeduserflag',
    work_items_view_processeduserflag = 'work_items.view_processeduserflag',
    work_items_add_comment = 'work_items.add_comment',
    work_items_view_workitem = 'work_items.view_workitem',

}

export enum SystemPermissions {
    auth_delete_group = 'auth.delete_group',
    sites_change_site = 'sites.change_site',
    django_celery_beat_add_crontabschedule =
        'django_celery_beat.add_crontabschedule',
    sessions_change_session = 'sessions.change_session',
    contenttypes_change_contenttype = 'contenttypes.change_contenttype',
    auth_change_group = 'auth.change_group',
    contenttypes_add_contenttype = 'contenttypes.add_contenttype',
    history_add_history = 'history.add_history',
    money_change_currency = 'money.change_currency',
    sites_delete_site = 'sites.delete_site',
    django_celery_beat_delete_intervalschedule =
        'django_celery_beat.delete_intervalschedule',
    django_celery_beat_change_periodictask =
        'django_celery_beat.change_periodictask',
    history_view_history = 'history.view_history',
    history_add_historyfield = 'history.add_historyfield',
    history_change_historyfield = 'history.change_historyfield',
    django_celery_beat_delete_periodictasks =
        'django_celery_beat.delete_periodictasks',
    contenttypes_view_contenttype = 'contenttypes.view_contenttype',
    django_celery_beat_view_intervalschedule =
        'django_celery_beat.view_intervalschedule',
    history_view_historyfield = 'history.view_historyfield',
    django_celery_beat_view_clockedschedule =
        'django_celery_beat.view_clockedschedule',
    auth_add_permission = 'auth.add_permission',
    django_celery_beat_delete_solarschedule =
        'django_celery_beat.delete_solarschedule',
    admin_delete_logentry = 'admin.delete_logentry',
    django_celery_beat_add_periodictask = 'django_celery_beat.add_periodictask',
    money_add_currency = 'money.add_currency',
    django_celery_beat_view_solarschedule =
        'django_celery_beat.view_solarschedule',
    auth_delete_permission = 'auth.delete_permission',
    auth_add_group = 'auth.add_group',
    history_delete_historyfield = 'history.delete_historyfield',
    sessions_delete_session = 'sessions.delete_session',
    auth_view_group = 'auth.view_group',
    admin_change_logentry = 'admin.change_logentry',
    django_celery_beat_change_intervalschedule =
        'django_celery_beat.change_intervalschedule',
    django_celery_beat_view_periodictask = 'django_celery_beat.view_periodictask',
    admin_add_logentry = 'admin.add_logentry',
    admin_view_logentry = 'admin.view_logentry',
    django_celery_beat_add_intervalschedule =
        'django_celery_beat.add_intervalschedule',
    sites_add_site = 'sites.add_site',
    sites_view_site = 'sites.view_site',
    sessions_add_session = 'sessions.add_session',
    money_delete_currency = 'money.delete_currency',
    django_celery_beat_add_solarschedule = 'django_celery_beat.add_solarschedule',
    history_change_history = 'history.change_history',
    django_celery_beat_delete_periodictask =
        'django_celery_beat.delete_periodictask',
    django_celery_beat_change_periodictasks =
        'django_celery_beat.change_periodictasks',
    money_view_currency = 'money.view_currency',
    django_celery_beat_delete_crontabschedule =
        'django_celery_beat.delete_crontabschedule',
    django_celery_beat_change_solarschedule =
        'django_celery_beat.change_solarschedule',
    django_celery_beat_add_periodictasks = 'django_celery_beat.add_periodictasks',
    django_celery_beat_view_periodictasks =
        'django_celery_beat.view_periodictasks',
    django_celery_beat_change_crontabschedule =
        'django_celery_beat.change_crontabschedule',
    django_celery_beat_view_crontabschedule =
        'django_celery_beat.view_crontabschedule',
    django_celery_beat_change_clockedschedule =
        'django_celery_beat.change_clockedschedule',
    auth_view_permission = 'auth.view_permission',
    django_celery_beat_add_clockedschedule =
        'django_celery_beat.add_clockedschedule',
    django_celery_beat_delete_clockedschedule =
        'django_celery_beat.delete_clockedschedule',
    history_delete_history = 'history.delete_history',
    sessions_view_session = 'sessions.view_session',
    auth_change_permission = 'auth.change_permission',
    contenttypes_delete_contenttype = 'contenttypes.delete_contenttype',
}

export type Permissions = PagesViewPermissions | UsersPermissions | ProjectsPermissions | DeveloperProjectsPermissions | SyncWithGoogleSheetsPermissions | VilmatesCommentsPermissions | WorkItemsPermissions | SystemPermissions;