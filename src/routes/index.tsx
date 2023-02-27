import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import MainLayout from 'components/MainLayout';
import { AppRoutes } from 'constants/appRoutesConstants';
import {
  PagesViewPermissions,
  SyncWithGoogleSheetsPermissions,
  UsersPermissions,
} from 'constants/permissions';

const GoogleSyncWithDrivePage = lazy(
  () => import('pages/GoogleSyncWithDrivePage/GoogleSyncWithDrivePage'),
);
const TimeReportPage = lazy(
  () => import('pages/TimeReportPage/TimeReportPage'),
);
const GoogleLoginRedirectPage = lazy(
  () => import('pages/GoogleLoginRedirectPage/GoogleLoginRedirectPage'),
);
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const ProjectsReportPage = lazy(
  () => import('pages/ProjectsReportPage/ProjectsReportPage'),
);
const ProjectManagementPage = lazy(
  () => import('pages/ProjectManagementPage/ProjectManagementPage'),
);

const VilmatesUserPage = lazy(
  () => import('pages/VilmatesUserPage/VilmatesUserPage'),
);
const VilmatesPage = lazy(() => import('pages/VailmatesPage/VilmatesPage'));

export const routes = createBrowserRouter([
  {
    path: AppRoutes.root,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={AppRoutes.timeReport}
            replace
          />
        ),
      },
      {
        path: AppRoutes.timeReport,
        element: <TimeReportPage />,
      },
      {
        path: AppRoutes.projectReport,
        element: <ProjectsReportPage />,
      },
      {
        path: AppRoutes.projectManagement,
        element: (
          <RequireAuth
            permissions={[
              PagesViewPermissions.users_can_view_projectmanagement,
            ]}
          >
            <ProjectManagementPage />
          </RequireAuth>
        ),
      },
      {
        path: AppRoutes.vilmates,
        element: (
          <RequireAuth
            permissions={[PagesViewPermissions.users_can_view_vilmates]}
          >
            <VilmatesPage />
          </RequireAuth>
        ),
      },
      {
        path: `${AppRoutes.vilmates}${AppRoutes.singlePage}/:id`,
        element: (
          <RequireAuth
            permissions={[PagesViewPermissions.users_can_view_vilmates]}
          >
            <VilmatesUserPage />
          </RequireAuth>
        ),
      },
      {
        path: AppRoutes.syncWithGoogleSheets,
        element: (
          <RequireAuth
            permissions={[
              SyncWithGoogleSheetsPermissions.users_can_view_syncdrive,
              SyncWithGoogleSheetsPermissions.gsheets_add_accesscredentials,
              SyncWithGoogleSheetsPermissions.gsheets_view_accesscredentials,
              UsersPermissions.users_add_user,
            ]}
          >
            <GoogleSyncWithDrivePage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: AppRoutes.auth,
    element: <LoginPage />,
  },
  {
    path: AppRoutes.loginWithGoogleAuthRedirect,
    element: <GoogleLoginRedirectPage />,
  },
  {
    path: '*',
    element: (
      <Navigate
        to={AppRoutes.root}
        replace
      />
    ),
  },
]);
