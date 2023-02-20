import { createBrowserRouter, Navigate } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import { VilmatesUserPage } from '../pages/VilmatesUserPage/VilmatesUserPage';
import { VilmatesPage } from '../pages/VailmatesPage';
import { GoogleSyncWithDrivePage } from 'pages/GoogleSyncWithDrivePage';
import { TimeReportPage } from 'pages/TimeReportPage';
import { GoogleLoginRedirectPage } from 'pages/GoogleLoginRedirectPage';
import MainLayout from 'components/MainLayout';
import { AppRoutes } from 'constants/appRoutesConstants';
import {
  PagesViewPermissions,
  SyncWithGoogleSheetsPermissions,
  UsersPermissions,
} from 'constants/permissions';
import LoginPage from 'pages/LoginPage';
import { ProjectsReportPage } from 'pages/ProjectsReportPage';

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
            <h1>Project Management</h1>
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
